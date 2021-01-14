/// <reference types="cypress" />

/* eslint-disable-next-line node/no-extraneous-import */
import { font } from 'practical-react-components-core'

const typographys = [
  {
    variant: 'page-heading',
    fontSize: font.size.larger,
    lineHeight: font.lineHeight.larger,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'dialog-heading',
    fontSize: font.size.larger,
    lineHeight: font.lineHeight.larger,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'button-text',
    fontSize: font.size.large,
    lineHeight: font.lineHeight.large,
    fontWeight: font.fontWeight.semibold,
  },
  {
    variant: 'default-text',
    fontSize: font.size.regular,
    lineHeight: font.lineHeight.large,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'header-title',
    fontSize: font.size.regular,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.semibold,
  },
  {
    variant: 'column-heading',
    fontSize: font.size.small,
    lineHeight: font.lineHeight.smaller,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'group-title',
    fontSize: font.size.regular,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.semibold,
  },
  {
    variant: 'card-title',
    fontSize: font.size.regular,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.semibold,
  },
  {
    variant: 'navigation-label',
    fontSize: font.size.regular,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'navigation-group',
    fontSize: font.size.small,
    lineHeight: font.lineHeight.smaller,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'caption',
    fontSize: font.size.small,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'explanatory-text',
    fontSize: font.size.small,
    lineHeight: font.lineHeight.small,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'chip-tag-text',
    fontSize: font.size.small,
    lineHeight: font.lineHeight.smaller,
    fontWeight: font.fontWeight.normal,
  },
  {
    variant: 'compact-label',
    fontSize: font.size.smaller,
    lineHeight: font.lineHeight.smallest,
    fontWeight: font.fontWeight.normal,
  },
]

context('Typography', () => {
  before(() => {
    cy.visit('http://localhost:9009/#components/typography')
  })

  it('Should exist', () => {
    typographys.forEach(typography => {
      cy.get(`[data-cy=${typography.variant}]`)
        .should('exist')
        .and('be.visible')
    })
  })

  it('Should be the correct sizes', () => {
    typographys.forEach(typography => {
      cy.get(`[data-cy=${typography.variant}]`).should(
        'have.css',
        'font-size',
        typography.fontSize
      )
      cy.get(`[data-cy=${typography.variant}]`).should(
        'have.css',
        'line-height',
        typography.lineHeight
      )
      cy.get(`[data-cy=${typography.variant}]`).should(
        'have.css',
        'font-weight',
        `${typography.fontWeight}`
      )
    })
  })
})
