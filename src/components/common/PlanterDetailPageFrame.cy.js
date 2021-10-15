import React from 'react';
import { mount } from '@cypress/react';
import PlanterDetailPageFrame from './PlanterDetailPageFrame.js';

describe('PlanterDetailPage component', () => {
  const imgUrl =
    'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg';

  it('Will display image', () => {
    mount(<PlanterDetailPageFrame imgUrl={imgUrl} />);
    cy.get('img').should('be.visible');
  });
});
