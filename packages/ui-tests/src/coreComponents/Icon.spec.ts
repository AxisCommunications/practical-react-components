/// <reference types="cypress" />

/* eslint-disable-next-line node/no-extraneous-import */
import { iconSize } from 'practical-react-components-core'

const parseIconSize = size => parseInt(size.split('px')[0])

const icons = [
  { name: 'small', size: parseIconSize(iconSize.small) },
  { name: 'medium', size: parseIconSize(iconSize.medium) },
  { name: 'default', size: parseIconSize(iconSize.medium) },
  { name: 'large', size: parseIconSize(iconSize.large) },
  { name: 'extraLarge', size: parseIconSize(iconSize.extraLarge) },
]

context('Icon', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/icon')
  })

  it('Should exist', () => {
    icons.forEach(icon => {
      cy.get(`[data-cy=${icon.name}]`).should('exist').and('be.visible')
    })
  })

  it('Should contain an SVG', () => {
    icons.forEach(icon => {
      cy.get(`[data-cy=${icon.name}]`).find('svg')
    })
  })

  it('Should be the correct sizes', () => {
    icons.forEach(icon => {
      cy.get(`[data-cy=${icon.name}]`).invoke('width').should('eq', icon.size)
      cy.get(`[data-cy=${icon.name}]`).invoke('height').should('eq', icon.size)
    })
  })
})
