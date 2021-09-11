import React from 'react';
import { mount } from '@cypress/react';
import DetailPage from './DetailPage.js';

describe('Detail Page component', () => {
  it('works', () => {
    mount(<DetailPage />);
  });
});
