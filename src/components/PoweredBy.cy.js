import React from 'react';
import { mount } from '@cypress/react';
import PoweredBy from './PoweredBy.js';

describe('PoweredBy', () => {
  it('PoweredBy', () => {
    mount(<PoweredBy />);
  });
});
