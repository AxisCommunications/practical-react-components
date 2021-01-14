import React from 'react'
import { useField } from 'formik'
import { Checkbox, ICheckboxProps } from 'practical-react-components-core'

export interface IFormikCheckboxProps
  extends Omit<ICheckboxProps, 'checked' | 'partial' | 'onPartialValueChange'>,
    Partial<Pick<ICheckboxProps, 'checked'>> {
  readonly name: string
}

export const FormikCheckbox: React.FC<IFormikCheckboxProps> = ({
  name,
  value,
  ...props
}) => {
  const [field] = useField<string>({
    name,
    value,
    type: 'checkbox',
  })
  const { checked, ...rest } = field

  return <Checkbox {...rest} checked={checked ?? false} {...props} />
}
