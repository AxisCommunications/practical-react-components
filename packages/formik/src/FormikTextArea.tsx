import { FC } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  TextArea,
  TextAreaProps,
  withField,
} from 'practical-react-components-core'

export interface FormikTextAreaProps
  extends Omit<TextAreaProps, 'name' | 'value'>,
    Partial<Pick<TextAreaProps, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikTextArea: FC<FormikTextAreaProps> = ({
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
