import React from 'react';
import { mount } from '@cypress/react';
import BackButton from './Home.js';

describe('Back Button component', () => {
  it('works', () => {
    mount(<BackButton />);
  });
});
