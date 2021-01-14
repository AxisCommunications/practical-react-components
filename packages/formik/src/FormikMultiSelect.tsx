import React, { useCallback } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  MultiSelect,
  IMultiSelectProps,
  IFieldProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikMultiSelectProps<V extends string = string>
  extends Omit<IMultiSelectProps<V>, 'name' | 'value'>,
    Partial<Pick<IMultiSelectProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikMultiSelect<V extends string = string>({
  name,
  validate,
  ...props
}: IFormikMultiSelectProps<V>): JSX.Element {
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
  props: IFieldProps & IFormikMultiSelectProps<V>
) => withField<IFormikMultiSelectProps<V>>(FormikMultiSelect)(props)
