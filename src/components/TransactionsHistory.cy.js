import React from 'react';
import { mount } from '@cypress/react';
import TransactionsHistory from './TransactionsHistory.js';

describe('transactions history', () => {
  it('it render transactions history', () => {
    mount(<TransactionsHistory />);
  });
});
