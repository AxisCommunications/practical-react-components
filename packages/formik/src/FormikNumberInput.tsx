import React from 'react'
import { useField, FieldConfig } from 'formik'
import {
  NumberInput,
  NumberInputProps,
  withField,
} from 'practical-react-components-core'

export interface FormikNumberInputProps
  extends Omit<NumberInputProps, 'name' | 'value'>,
    Pick<FieldConfig, 'name' | 'validate'> {
  readonly value?: number
}

export const FormikNumberInput: React.FC<FormikNumberInputProps> = ({
  name,
  validate,
  ...props
}) => {
  const [field, meta] = useField<number>({ name, validate })

  return (
    <NumberInput
      {...field}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikNumberInputField = withField(FormikNumberInput)
