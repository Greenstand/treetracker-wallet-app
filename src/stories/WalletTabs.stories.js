import React from 'react';

import WalletTabs from './../components/WalletTabs';

export default {
  title: "YourComponent/FifthStory",
  component: WalletTabs
}

const Template = (args) => <WalletTabs {...args} />

export const FifthStory = Template.bind({})

FifthStory.args = {
  firstTab: "Tokens",
  secondTab: "Impact"
}
