import React from 'react';
import { mount } from '@cypress/react';
import Caution from './Caution.js';

describe('Caution', () => {
  it('Caution', () => {
    mount(<Caution />);
  });
});
