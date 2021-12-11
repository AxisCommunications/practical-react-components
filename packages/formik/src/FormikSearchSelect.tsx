import React, { useCallback } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  SearchSelect,
  SelectProps,
  FieldProps,
  withField,
} from 'practical-react-components-core'

export interface FormikSearchSelectProps<V extends string = string>
  extends Omit<SelectProps<V>, 'name' | 'value'>,
    Partial<Pick<SelectProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikSearchSelect<V extends string = string>({
  name,
  validate,
  ...props
}: FormikSearchSelectProps<V>): JSX.Element {
  const [field, meta, { setValue, setTouched }] = useField<V>({
    name,
    validate,
  })
  const onBlur = useCallback(() => setTouched(true), [setTouched])

  return (
    <SearchSelect<V>
      {...field}
      onChange={setValue}
      onBlur={onBlur}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikSearchSelectField = <V extends string = string>(
  props: FieldProps & FormikSearchSelectProps<V>
) => withField<FormikSearchSelectProps<V>>(FormikSearchSelect)(props)
