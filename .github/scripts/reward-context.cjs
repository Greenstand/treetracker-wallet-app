
// Only merges into this branch pay out; issue_comment carries no branch filter.
const REWARD_BRANCH = "main";
const AMOUNT_LABEL = /^token:(\d+)$/;
const PAID_LABEL = "token:paid";

// Wallet names only: the value reaches a shell step and a script step.
const CLAIM = /^\/wallet\s+([A-Za-z0-9_.-]{2,30})\s*$/m;

async function closingIssues({ github, context }, prNumber) {
  const { repository } = await github.graphql(
    `query ($owner: String!, $repo: String!, $pr: Int!) {
      repository(owner: $owner, name: $repo) {
        pullRequest(number: $pr) {
          closingIssuesReferences(first: 20) {
            nodes { number labels(first: 50) { nodes { name } } }
          }
        }
      }
    }`,
    { owner: context.repo.owner, repo: context.repo.repo, pr: prNumber },
  );

  return repository.pullRequest.closingIssuesReferences.nodes;
}

function rewardFrom(issues) {
  let amount = 0;
  const covered = [];

  for (const issue of issues) {
    const names = issue.labels.nodes.map((label) => label.name);
    if (names.includes(PAID_LABEL)) continue;

    const labelled = names.map((n) => n.match(AMOUNT_LABEL)).find(Boolean);
    if (!labelled) continue;

    amount += Number(labelled[1]);
    covered.push(issue.number);
  }

  return { amount, covered };
}

async function claimFrom({ github, context }, prNumber, author) {
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    per_page: 100,
  });

  // Only the author's own comment pays, so nobody can redirect a reward.
  const claim = comments
    .filter((comment) => comment.user.login === author)
    .map((comment) => comment.body.match(CLAIM))
    .filter(Boolean)
    .pop();

  return claim?.[1];
}

module.exports = async ({ github, context, core }) => {
  const isComment = context.eventName === "issue_comment";
  const prNumber = isComment
    ? context.payload.issue.number
    : context.payload.pull_request.number;

  const { data: pr } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: prNumber,
  });

  const author = pr.user.login;
  const none = (reason) => {
    core.info(`no reward: ${reason}`);
    core.setOutput("action", "none");
  };

  if (!pr.merged) return none("pull request is not merged");
  if (pr.base.ref !== REWARD_BRANCH) return none(`merged into ${pr.base.ref}`);
  if (pr.user.type === "Bot") return none("author is a bot");
  if (isComment && context.payload.comment.user.login !== author) {
    return none("claim did not come from the author");
  }

  const { amount, covered } = rewardFrom(
    await closingIssues({ github, context }, prNumber),
  );
  if (amount < 1) return none("no unpaid token:<n> issue closed by this PR");

  core.setOutput("pr", prNumber);
  core.setOutput("author", author);
  core.setOutput("amount", amount);
  core.setOutput("issues", JSON.stringify(covered));

  const wallet = await claimFrom({ github, context }, prNumber, author);
  if (!wallet) {
    core.setOutput("action", "prompt");
    return;
  }

  core.setOutput("wallet", wallet);
  core.setOutput("action", "pay");
};
