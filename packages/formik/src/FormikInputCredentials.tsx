import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  TextInputCredentials,
  ITextInputCredentialsProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikInputCredentialsProps
  extends Omit<ITextInputCredentialsProps, 'name' | 'value'>,
    Partial<Pick<ITextInputCredentialsProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikInputCredentials: React.FC<IFormikInputCredentialsProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field, meta] = useField({ name, validate })

  return (
    <TextInputCredentials
      {...field}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikInputCredentialsField = withField(FormikInputCredentials)
