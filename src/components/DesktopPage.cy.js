import React from 'react';
import { mount } from '@cypress/react';
import DesktopPage from './DesktopPage.js';

describe('DesktopPage', () => {
  it('DesktopPage', () => {
    mount(<DesktopPage />);
  });
});
