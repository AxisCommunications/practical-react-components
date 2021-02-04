import React from 'react'
import { useField } from 'formik'
import { Checkbox, CheckboxProps } from 'practical-react-components-core'

export interface FormikCheckboxProps
  extends Omit<CheckboxProps, 'checked' | 'partial' | 'onPartialValueChange'>,
    Partial<Pick<CheckboxProps, 'checked'>> {
  readonly name: string
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({
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
