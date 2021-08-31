import React from 'react'
import { mount } from '@cypress/react'
import Home from './Home.js'

describe('HelloWorld component', () => {
  it('works', () => {
//    function Home(){
//      return(
//        <div>Home</div>
//      )
//    }

    mount(<Home />)
    // now use standard Cypress commands
    // cy.contains('Hello World!').should('be.visible')
  })
})
