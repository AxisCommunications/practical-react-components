import 'jest-styled-components'
import { expect, test, describe } from '@jest/globals'

import { DeviceIcon } from 'practical-react-components-icons'

import { Icon } from '.'
import { TestRender } from '../TestUtils'

describe('Icons', () => {
  test('Sizes', () => {
    const tree1 = TestRender(<Icon icon={DeviceIcon} size="small" />)
    expect(tree1).toMatchSnapshot()

    const tree2 = TestRender(<Icon icon={DeviceIcon} />)
    expect(tree2).toMatchSnapshot()

    const tree3 = TestRender(<Icon icon={DeviceIcon} size="medium" />)
    expect(tree3).toMatchSnapshot()

    const tree4 = TestRender(<Icon icon={DeviceIcon} size="large" />)
    expect(tree4).toMatchSnapshot()

    const tree5 = TestRender(<Icon icon={DeviceIcon} size="extraLarge" />)
    expect(tree5).toMatchSnapshot()
  })
})
