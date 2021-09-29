import React from 'react';
import { mount } from '@cypress/react';
import CustomShareIcon from './CustomShareIcon.js';

describe('CustomShareIcon', () => {
  it('CustomShareIcon', () => {
    mount(<CustomShareIcon />);
  });
});
