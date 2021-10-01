import React from 'react';
import { mount } from '@cypress/react';
import TokenGraph from './TokenGraph.js';

describe('Tokens chart', () => {
  it('render chart', () => {
    mount(<TokenGraph />);
  });
});
