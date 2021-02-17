import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  FieldProps,
  RadioButtonGroup,
  RadioButtonGroupProps,
  withField,
} from 'practical-react-components-core'

export interface FormikRadioButtonGroupProps<V extends string = string>
  extends Omit<RadioButtonGroupProps<V>, 'name' | 'value'>,
    Partial<Pick<RadioButtonGroupProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikRadioButtonGroup<V extends string = string>({
  name,
  validate,
  ...props
}: FormikRadioButtonGroupProps<V>) {
  const [field] = useField({ name, validate })

  return <RadioButtonGroup {...field} {...props} />
}

export const FormikRadioButtonGroupField = <V extends string = string>(
  props: FieldProps & FormikRadioButtonGroupProps<V>
) => withField<FormikRadioButtonGroupProps<V>>(FormikRadioButtonGroup)(props)
