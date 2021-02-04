import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  RadioButtonGroup,
  RadioButtonGroupProps,
  withField,
} from 'practical-react-components-core'

export interface FormikRadioButtonGroupProps
  extends Omit<RadioButtonGroupProps, 'name' | 'value'>,
    Partial<Pick<RadioButtonGroupProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikRadioButtonGroup: React.FC<FormikRadioButtonGroupProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field] = useField({ name, validate })

  return <RadioButtonGroup {...field} {...props} />
}

export const FormikRadioButtonGroupField = withField(FormikRadioButtonGroup)
