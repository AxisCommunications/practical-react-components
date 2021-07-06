import React, { useCallback, useState } from 'react'

import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Select } from '.'
import { PracticalProvider } from '../Practical'

const SelectTestComponent: React.FC = () => {
  const [value, setValue] = useState('apple')
  const handleChange = useCallback(
    v => {
      setValue(v)
    },
    [setValue]
  )

  return (
    <Select
      value={value}
      options={[
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'pie', label: 'Pie', disabled: true },
      ]}
      onChange={handleChange}
      placeholder="Select..."
    />
  )
}

describe('Test if "userEvent" works to click on menuitem in Select', () => {
  test('Select "Banana"', async () => {
    render(
      <PracticalProvider>
        <SelectTestComponent />
      </PracticalProvider>
    )

    const selectComponent = await screen.findByRole('button')
    expect(await within(selectComponent).findByText('Apple'))

    userEvent.click(selectComponent)

    const item_banana = await screen.findByRole('menuitem', { name: 'Banana' })
    // userEvent.click(item_banana) // NOT WORKING
    fireEvent.click(item_banana) // WORKING
    expect(await within(selectComponent).findByText('Banana'))
  })
})
