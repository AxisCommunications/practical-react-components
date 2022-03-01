import { FC } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  TextInputCredentials,
  TextInputCredentialsProps,
  withField,
} from 'practical-react-components-core'

export interface FormikInputCredentialsProps
  extends Omit<TextInputCredentialsProps, 'name' | 'value'>,
    Partial<Pick<TextInputCredentialsProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikInputCredentials: FC<FormikInputCredentialsProps> = ({
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
