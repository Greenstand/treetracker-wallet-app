import React from 'react';
import { mount } from '@cypress/react';
import BackButton from './BackButton';

describe('Back Button component', () => {
  it('works', () => {
    mount(<BackButton />);
  });
});
