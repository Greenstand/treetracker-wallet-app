let users = [
  {
    id: "zaven",
    name: "Zaven",
    avatarURL:
      "https://gravatar.com/avatar/a200b8c31f271d6d102ec101125683b0?s=400&d=robohash&r=x",
    tokensIDs: [
      "7f22f06f-d665-492e-ab7c-7328d78f6bf9",
      "8f74f56f-e635-442g-ez7g-7328g78f6bf9"
    ],
    userType: "buyer"
  },
  {
    id: "abayomi",
    name: "Abayomi",
    avatarURL:
      "https://gravatar.com/avatar/a199b8c31f271d6d102ec101125683b0?s=400&d=robohash&r=x",
    tokensIDs: [
      "7f22f06f-d665-492e-ab7c-7328d78f6bf9",
      "8f74f56f-e635-442g-ez7g-7328g78f6bf9"
    ],
    userType: "planter"
  }
];

let tokens = [
  {
    id: "7f22f06f-d665-492e-ab7c-7328d78f6bf9",
    planter: "abayomi",
    history: [
      {
        event: "Token claimed",
        authorizer: "Finor X",
        by: "02-18-2021"
      },
      {
        event: "Token assigned",
        authorizer: "Freetown City Council",
        by: "01-26-2021"
      },
      {
        event: "Token verified",
        authorizer: "Greenstand",
        by: "01-26-2021"
      },
      {
        event: "Token created",
        authorizer: "Abayomi",
        by: "01-24-2021"
      }
    ],
    impactManager: "Finor X",
    metaData: "xxxxxx",
    photoURL: "https://picsum.photos/800",
    tokenName: "Marula"
  },
  {
    id: "8f74f56f-e635-442g-ez7g-7328g78f6bf9",
    planter: "abayomi",
    history: [
      {
        event: "Token assigned",
        authorizer: "Haiti Tree Project",
        by: "02-26-2021"
      },
      {
        event: "Token verified",
        authorizer: "Greenstand",
        by: "02-26-2021"
      },
      {
        event: "Token created",
        authorizer: "Abayomi",
        by: "02-24-2021"
      }
    ],
    impactManager: "Finor X",
    metaData: "xxxxxx",
    photoURL: "https://picsum.photos/800",
    tokenName: "Urumala"
  }
];

export const _getUsers = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...users }), 2000);
  });
};

export const _getTokens = () => {
  return new Promise((res, rej) => {
    setTimeout(() => res({ ...tokens }), 2000);
  });
};

