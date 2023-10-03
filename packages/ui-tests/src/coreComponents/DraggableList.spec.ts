/// <reference types="cypress" />

const draggableListItemEl = '[class^=DraggableList__DraggableItem]'
const draggableHandleEl = '[class^=DraggableList__DraggableHandle]'

context('DraggableList', { testIsolation: false }, () => {
  before(() => {
    cy.visit('http://localhost:9009/#/components/draggablelist')
  })

  it('Should exist and be visible', () => {
    cy.get('[data-cy=draggableList]').should('exist').should('be.visible')
  })

  it('Count list item number', () => {
    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .should('have.length', 5)
  })

  /**
   * Items should be [0, 1, 2, 3, 4] just like index of array.
   */
  it('List item should contain correct text', () => {
    Array(5)
      .fill(0)
      .forEach((_, i) => {
        cy.get('[data-cy=draggableList]')
          .find(draggableListItemEl)
          .eq(i)
          .contains(i.toString())
      })
  })

  /**
   * When `DraggableHandle` get `mouseDown` event, `DraggableItem` should have attribute `draggable` which is `true`.
   */
  it('List item should have attribute draggable "true" when the Handle get "mouse down" event', () => {
    cy.get('[data-cy=draggableList]')
      .find(draggableHandleEl)
      .eq(0)
      .trigger('mousedown')
    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(0)
      .should('have.attr', 'draggable', 'true')
  })

  /**
   * When `DraggableHandle` get `mouseUp` event, `DraggableItem` should have attribute `draggable` which is `false`.
   */
  it('List item should have attribute draggable "false" when the Handle get "mouse up" event', () => {
    cy.get('[data-cy=draggableList]')
      .find(draggableHandleEl)
      .eq(0)
      .trigger('mouseup')
    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(0)
      .should('have.attr', 'draggable', 'false')
  })

  /**
   * Change items order from [0, 1, 2, 3, 4] to [2, 0, 1, 3, 4]
   * by dragging "2" to "0". Then check if the order is correct.
   */
  it('Drag item 2 to item 0 place', () => {
    const dt = new DataTransfer()

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(2)
      .trigger('dragstart', { dataTransfer: dt })

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(0)
      .trigger('dragover')

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(0)
      .trigger('dragend')

    // After dragging, items should be in this order.
    const items = [2, 0, 1, 3, 4]

    items.forEach((item, i) => {
      cy.get('[data-cy=draggableList]')
        .find(draggableListItemEl)
        .eq(i)
        .contains(item.toString())
    })
  })

  /**
   * Item "3" is disabled.
   * And it should have `disabled` attribute and should not have `DraggableHandle`.
   */
  it('Item "3" should have disabled attribute and should not have handle icon', () => {
    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(3)
      .children()
      .should('have.attr', 'disabled')

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(3)
      .find(draggableHandleEl)
      .should('not.exist')
  })

  /**
   * Drag item to disabled item's place.
   *
   * Current order: [2, 0, 1, 3, 4]
   * Drag "2" to "3" which is disabled.
   * Nothing should change.
   */
  it("Should not change order when dragging to disabled item's place", () => {
    const dt = new DataTransfer()

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(0)
      .trigger('dragstart', { dataTransfer: dt })

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(3)
      .trigger('dragover')

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(3)
      .trigger('dragend')

    // After dragging, items should be in this order.
    const items = [2, 0, 1, 3, 4]

    items.forEach((item, i) => {
      cy.get('[data-cy=draggableList]')
        .find(draggableListItemEl)
        .eq(i)
        .contains(item.toString())
    })
  })

  /**
   * Dragging test when there is disabled item between drag item and target item.
   *
   * Current order: [2, 0, 1, 3, 4]
   * Item "3" is disabled and it should not move its place.
   * If we drag "1" to "4", the order should be [2, 0, 4, 3, 1].
   *
   */
  it('Drag item 0 to item 4 place', () => {
    const dt = new DataTransfer()

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(2)
      .trigger('dragstart', { dataTransfer: dt })

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(4)
      .trigger('dragover')

    cy.get('[data-cy=draggableList]')
      .find(draggableListItemEl)
      .eq(4)
      .trigger('dragend')

    // After dragging, items should be in this order.
    const items = [2, 0, 4, 3, 1]

    items.forEach((item, i) => {
      cy.get('[data-cy=draggableList]')
        .find(draggableListItemEl)
        .eq(i)
        .contains(item.toString())
    })
  })
})
