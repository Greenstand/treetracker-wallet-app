import React from 'react';
import { mount } from '@cypress/react';
import ImpactTab from './ImpactTab.js';

describe('ImpactTab', () => {
  it('ImpactTab', () => {
    mount(<ImpactTab />);
  });
});
