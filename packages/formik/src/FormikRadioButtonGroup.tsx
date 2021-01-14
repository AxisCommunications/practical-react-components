import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  RadioButtonGroup,
  IRadioButtonGroupProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikRadioButtonGroupProps
  extends Omit<IRadioButtonGroupProps, 'name' | 'value'>,
    Partial<Pick<IRadioButtonGroupProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikRadioButtonGroup: React.FC<IFormikRadioButtonGroupProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field] = useField({ name, validate })

  return <RadioButtonGroup {...field} {...props} />
}

export const FormikRadioButtonGroupField = withField(FormikRadioButtonGroup)
