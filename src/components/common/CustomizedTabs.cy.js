import React from 'react';
import { mount } from '@cypress/react';
import Tab from './CustomizedTabs.js';

describe('Tab', () => {
  it('tab', () => {
    mount(<Tab />);
  });
});
// Test case for eslint
// it('waits for a second', () => {
//   cy.wait(1000)
// })
