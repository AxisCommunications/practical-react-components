import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  DurationInput,
  IDurationInputProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikDurationInputProps
  extends Omit<IDurationInputProps, 'name' | 'value' | 'onChange'>,
    Partial<Pick<IDurationInputProps, 'value' | 'onChange'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikDurationInput: React.FC<IFormikDurationInputProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field, meta, { setValue }] = useField({ name, validate })

  return (
    <DurationInput
      {...field}
      onChange={setValue}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikDurationInputField = withField(FormikDurationInput)
