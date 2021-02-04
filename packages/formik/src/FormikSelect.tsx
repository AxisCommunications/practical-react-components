import React, { useCallback } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  Select,
  SelectProps,
  FieldProps,
  withField,
} from 'practical-react-components-core'

export interface FormikSelectProps<V extends string = string>
  extends Omit<SelectProps<V>, 'name' | 'value'>,
    Partial<Pick<SelectProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikSelect<V extends string = string>({
  name,
  validate,
  ...props
}: FormikSelectProps<V>): JSX.Element {
  const [field, meta, { setValue, setTouched }] = useField<V>({
    name,
    validate,
  })
  const onBlur = useCallback(() => setTouched(true), [setTouched])

  return (
    <Select<V>
      {...field}
      onChange={setValue}
      onBlur={onBlur}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikSelectField = <V extends string = string>(
  props: FieldProps & FormikSelectProps<V>
) => withField<FormikSelectProps<V>>(FormikSelect)(props)
