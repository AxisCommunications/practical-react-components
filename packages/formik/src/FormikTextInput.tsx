import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  TextInput,
  ITextInputProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikTextInputProps
  extends Omit<ITextInputProps, 'name' | 'value'>,
    Partial<Pick<ITextInputProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikTextInput: React.FC<IFormikTextInputProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field, meta] = useField({ name, validate })

  return (
    <TextInput
      {...field}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikTextInputField = withField(FormikTextInput)
