import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  TextArea,
  ITextAreaProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikTextAreaProps
  extends Omit<ITextAreaProps, 'name' | 'value'>,
    Partial<Pick<ITextAreaProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikTextArea: React.FC<IFormikTextAreaProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field, meta] = useField({ name, validate })

  return (
    <TextArea
      {...field}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikTextAreaField = withField(FormikTextArea)
