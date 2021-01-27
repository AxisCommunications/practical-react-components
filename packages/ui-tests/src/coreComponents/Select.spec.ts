/// <reference types="cypress" />

context('Select', () => {
  const popOverEl = '[class^=PopOver__]'
  const popOverSelectItem = '[class^=BaseSelect__SelectItem]'
  const multiSelectChip = '[class^=MultiSelect__ChipContainer]'
  const selectSelectedItem =
    '[class^=BaseSelectSelector__SelectInsideContainer]'
  const searchSelectInput = '[class^=SearchSelect__InputNative]'

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'pie', label: 'Pie', disabled: true },
  ]

  const tzOptions = [
    { value: 'Africa/Abidjan', label: 'Africa + Abidjan' },
    { value: 'Africa/Accra', label: 'Africa + Accra' },
    { value: 'Africa/Addis_Ababa', label: 'Africa + Addis_Ababa' },
    { value: 'Africa/Algiers', label: 'Africa + Algiers' },
    { value: 'Africa/Asmara', label: 'Africa + Asmara' },
    { value: 'Africa/Asmera', label: 'Africa + Asmera' },
    { value: 'Africa/Bamako', label: 'Africa + Bamako' },
    { value: 'Africa/Bangui', label: 'Africa + Bangui' },
    { value: 'Africa/Banjul', label: 'Africa + Banjul' },
    { value: 'Africa/Bissau', label: 'Africa + Bissau' },
  ]

  before(() => {
    cy.visit('http://localhost:9009/#components/select')
  })

  /*
   * Looks for Select, MultiSelect, and SearchSelect, making sure they exist
   * and are visible.
   */
  it('Find Select, MultiSelect and SearchSelect', () => {
    cy.get('[data-cy=selectTest]').should('exist').should('be.visible')
    cy.get('[data-cy=multiSelectTest]').should('exist').should('be.visible')
    cy.get('[data-cy=searchSelectTest]').should('exist').should('be.visible')
  })

  /*
   * Clicks on Select, makes sure the popover becomes visible.
   * Then clicks again and makes sure the popover has dissapeared.
   */
  it("Open Select, check if popover is visible, click on Select, check if popover doesn't exist", () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Clicks on Select, makes sure the popover becomes visible.
   * Then it scrolls on main and makes sure the popover has dissapeared.
   */
  it("Open Select, check if popover is visible, scroll on main, check if popover doesn't exist", () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('main').parent().scrollTo(0, 500)
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Clicks on Select, selects the first item, makes sure the popover doesn't
   * exist and that the selected item has a label matching the corresponding
   * label in the options list.
   */
  it("Open Select, select an item, check if popover doesn't exist, check if selected item exists", () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(0).click()
    cy.get(popOverEl).should('not.exist')
    cy.get('[data-cy=selectTest]')
      .find(selectSelectedItem)
      .should('exist')
      .contains(options[0].label)
  })

  /*
   * Clicks on Select, selects the second item in the popover.
   * Then makes sure the selected item has a label matching the
   * corresponding label in the options list.
   */
  it('Open select, select a new item, check if new selected item exists', () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(1).click()
    cy.get('[data-cy=selectTest]')
      .find(selectSelectedItem)
      .should('exist')
      .contains(options[1].label)
  })

  /*
   * Open the Select popover again.
   * Then makes sure the selected item has the correct background color
   * indicating that it is selected.
   */
  it('Open select, check if the selected item has correct background color', () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl)
      .find(popOverSelectItem)
      .eq(1)
      .should('have.css', 'background-color', 'rgb(245, 245, 245)')
    cy.get('[data-cy=selectTest]').click()
  })

  /*
   * Clicks on select, finds the disabled item and ensure that it
   * has the disabled attribute. Then it clicks it in order to make sure
   * that nothing happens.
   */
  it('Open Select, find disabled item, check if item has disabled attribute, clicks item making sure nothing happens', () => {
    cy.get('[data-cy=selectTest]').click()
    cy.get(popOverEl)
      .find(popOverSelectItem)
      .eq(2)
      .should('have.attr', 'disabled')
    cy.get(popOverEl).find(popOverSelectItem).eq(2).click()
    cy.get(popOverEl).should('exist').should('be.visible')
  })

  /*
   * Clicks on MultiSelect, makes sure the popover becomes visible.
   * Then clicks again and makes sure the popover has dissapeared.
   */
  it("Open MultiSelect, check if popover is visible, click on MultiSelect, check if popover doesn't exist", () => {
    cy.get('[data-cy=multiSelectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('[data-cy=multiSelectTest]').click()
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Clicks on MultiSelect, makes sure the popover becomes visible.
   * Then it scrolls on main and makes sure the popover has dissapeared.
   */
  it("Open MultiSelect, check if popover is visible, scroll on main, check if popover doesn't exist", () => {
    cy.get('[data-cy=multiSelectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('main').parent().scrollTo(0, 500)
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Click on MultiSelect, find the popover and clicks on the first item in the list.
   * Makes sure the popover has dissapeared.
   */
  it("Open Multiselect, select an item, check if popover doesn't exist", () => {
    cy.get('[data-cy=multiSelectTest').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(0).click()
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Checks to see if the selected item in MultiSelect has matching label as
   * the corresponding labe in tzOptions list.
   */
  it('Check if selected item in MultiSelect exists', () => {
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .should('exist')
      .contains(tzOptions[0].label)
  })

  /*
   * Clicks on the cross on the selected MultiSelect item
   * and checks to see if it is still there.
   */
  it("Click on the X on the MultiSelect item, check if MultiSelect item doesn't exists", () => {
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .find('svg')
      .click()
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .should('not.exist')
  })

  /*
   * Clicks on MultiSelect and selects the first item in the popover twice.
   * Making sure two selected items can exist in the same time.
   */
  it('2X Open MultiSelect, select an item', () => {
    cy.get('[data-cy=multiSelectTest').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(0).click()
    cy.get('[data-cy=multiSelectTest').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(0).click()
  })

  /*
   * Clicks on the cross of the first selected item, then checks to make sure that
   * the second item takes it's place as first item. Then it clicks on the cross
   * of the remaining item and makes sure it gets removed as well.
   */
  it("Remove first item, check to see if second item has taken it's place. Remove second item, make sure it has been removed", () => {
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .find('svg')
      .eq(0)
      .click()
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .should('exist')
      .contains(tzOptions[1].label)
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .find('svg')
      .eq(0)
      .click()
    cy.get('[data-cy=multiSelectTest]')
      .find(multiSelectChip)
      .should('not.exist')
  })

  /*
   * Clicks on SearchSelect, makes sure the popover becomes visible.
   * Then clicks again and makes sure the popover has dissapeared.
   */
  it("Open SearchSelect, check if popover is visible, click on SearchSelect, check if popover doesn't exist", () => {
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Clicks on SearchSelect, makes sure the popover becomes visible.
   * Then it scrolls on main and makes sure the popover has dissapeared.
   */
  it("Open SearchSelect, check if popover is visible, scroll on main, check if popover doesn't exist", () => {
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl).should('exist').should('be.visible')
    cy.get('main').parent().scrollTo(0, 500)
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Click on SearchSelect, find the popover and clicks on the first item in the list.
   * Makes sure the popover has dissapeared.
   */
  it("Open SearchSelect, select an item, check if popover doesn't exist", () => {
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(0).click()
    cy.get(popOverEl).should('not.exist')
  })

  /*
   * Clicks on SearchSelect, looks to see if a new item can be selected.
   */
  it('Open SearchSelect, see if a new item can be selected', () => {
    cy.get('[data-cy=searchSelectTest]').click()
    Array(10)
      .fill(0)
      .forEach((_, i) => {
        cy.get(popOverEl).find(popOverSelectItem).eq(i).should('exist')
      })
  })

  /*
   * Erases the textinput in SearchSelect and checks to see if the item is still there.
   */
  it('Erase SearchSelect, check if item still exists', () => {
    cy.get('[data-cy=searchSelectTest]').find(searchSelectInput).clear()
    cy.get('[data-cy=searchSelectTest]')
      .find(searchSelectInput)
      .should('be.empty')
  })

  /*
   * Click on SearchSelect and type in the first item in the tzOptions list, check if
   * corresponding item shows up in popover list.
   */
  it('Open SearchSelect, type a label into search bar, check if matching item exists in popover, erase SearchSelect', () => {
    cy.get('[data-cy=searchSelectTest]').click().type(tzOptions[0].label)
    cy.get(popOverEl).find(popOverSelectItem).eq(0).contains(tzOptions[0].label)
    cy.get('[data-cy=searchSelectTest]').find(searchSelectInput).clear()
  })

  /*
   * Click on SearchSelect and type in the first item in the tzOptions list, check if
   * an dissimilar item shows up in popover list.
   */
  it('Open SearchSelect, type a label into search bar, check if a none-matching item exists in popover, erase SearchSelect', () => {
    cy.get('[data-cy=searchSelectTest]').click().type(tzOptions[1].label)
    cy.get(popOverEl)
      .find(popOverSelectItem)
      .eq(0)
      .should('not.contain', tzOptions[0].label)
    cy.get('[data-cy=searchSelectTest]').find(searchSelectInput).clear()
  })

  /*
   * Click on SearchSelect and selects the second item in the popover.
   * Then makes sure the selected item has the correct background color
   * indicating that it is selected.
   */
  it('Open SearchSelect, check if the selected item has correct background color', () => {
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl).find(popOverSelectItem).eq(1).click()
    cy.get('[data-cy=searchSelectTest]').click()
    cy.get(popOverEl)
      .find(popOverSelectItem)
      .eq(1)
      .should('have.css', 'background-color', 'rgb(245, 245, 245)')
  })
})
