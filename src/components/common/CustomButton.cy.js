import React from 'react';
import { mount } from '@cypress/react';
import CustomButton from './CustomButton.js';

describe('Custom Button component', () => {
  it('works', () => {
    mount(<CustomButton />);
  });
});
