import React from 'react';

import TokenChip from './../components/TokenChip';

export default {
  title: "YourComponent/ThirdStory",
  component: TokenChip
}

const Template = (args) => <TokenChip {...args} />

export const ThirdStory = Template.bind({})

ThirdStory.args = {
  status: "Tree Verified"
}
