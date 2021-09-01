import React from 'react'
import { mount } from '@cypress/react'
import MapDrawer from './MapDrawer.js'

describe('MapDrawer', () => {
  it('basic', () => {

    mount(
      <MapDrawer />,
      {
        style: `
          body {
            margin: 0px;
          }
        `
      }
    )
    // now use standard Cypress commands
    // cy.contains('Hello World!').should('be.visible')
  })
})
