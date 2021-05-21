import React from "react";

import WalletPanel from "./../components/WalletPanel";

export default {
  title: "YourComponent/FirstStory",
  component: WalletPanel,
};

const Template = (args) => <WalletPanel {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  showWallet: true,
};
