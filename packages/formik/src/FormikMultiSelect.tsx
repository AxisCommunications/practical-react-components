import React, { useCallback } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  MultiSelect,
  MultiSelectProps,
  FieldProps,
  withField,
} from 'practical-react-components-core'

export interface FormikMultiSelectProps<V extends string = string>
  extends Omit<MultiSelectProps<V>, 'name' | 'value'>,
    Partial<Pick<MultiSelectProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikMultiSelect<V extends string = string>({
  name,
  validate,
  ...props
}: FormikMultiSelectProps<V>): JSX.Element {
  const [field, meta, { setValue, setTouched }] = useField<ReadonlyArray<V>>({
    name,
    validate,
  })
  const onBlur = useCallback(() => setTouched(true), [setTouched])

  return (
    <MultiSelect<V>
      {...field}
      onChange={setValue}
      onBlur={onBlur}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikMultiSelectField = <V extends string = string>(
  props: FieldProps & FormikMultiSelectProps<V>
) => withField<FormikMultiSelectProps<V>>(FormikMultiSelect)(props)
