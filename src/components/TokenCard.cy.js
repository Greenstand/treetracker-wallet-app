import React from 'react';
import { mount } from '@cypress/react';
import TokenCard from './TokenCard.js';

describe('Token Card', () => {
  it('works', () => {
    mount(<TokenCard />);
  });
});
