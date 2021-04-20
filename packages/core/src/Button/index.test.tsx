import React from 'react'
import 'jest-styled-components'

import { Button, IconButton, IconTextButton } from '.'
import { AddIcon, CloseIcon } from 'practical-react-components-icons'
import { TestRender } from '../TestUtils'

const onClick = () => {
  console.log('clicked!')
}

describe('Button', () => {
  test('primary', () => {
    const tree1 = TestRender(
      <Button variant="primary" label="click me" onClick={onClick} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Button
        variant="primary"
        label="click me"
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('secondary', () => {
    const tree1 = TestRender(
      <Button variant="secondary" label="click me" onClick={onClick} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <Button
        variant="secondary"
        label="click me"
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(
      <Button
        variant="secondary"
        label="click me"
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(
      <Button
        variant="secondary"
        accent={true}
        label="click me"
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(
      <Button
        variant="secondary"
        accent={true}
        label="click me"
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree5).toMatchSnapshot()
  })
})

describe('IconButton', () => {
  test('primary', () => {
    const tree1 = TestRender(
      <IconButton variant="primary" icon={AddIcon} onClick={onClick} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <IconButton
        variant="primary"
        icon={AddIcon}
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('secondary', () => {
    const tree1 = TestRender(
      <IconButton variant="secondary" icon={AddIcon} onClick={onClick} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <IconButton
        variant="secondary"
        icon={AddIcon}
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()
  })

  test('secondary', () => {
    const tree1 = TestRender(
      <IconButton
        variant="secondary"
        accent={true}
        icon={AddIcon}
        onClick={onClick}
      />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <IconButton
        variant="secondary"
        accent={true}
        icon={AddIcon}
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()
  })
})

describe('IconTextButton', () => {
  test('primary', () => {
    const tree1 = TestRender(
      <IconTextButton label="Click me" icon={CloseIcon} onClick={onClick} />
    )
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(
      <IconTextButton
        label="Click me"
        icon={CloseIcon}
        onClick={onClick}
        disabled={true}
      />
    )
    expect(tree2).toMatchSnapshot()
  })
})
