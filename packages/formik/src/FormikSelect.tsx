import React, { useCallback } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  Select,
  ISelectProps,
  IFieldProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikSelectProps<V extends string = string>
  extends Omit<ISelectProps<V>, 'name' | 'value'>,
    Partial<Pick<ISelectProps<V>, 'value'>>,
    Pick<FieldConfig, 'name' | 'validate'> {}

export function FormikSelect<V extends string = string>({
  name,
  validate,
  ...props
}: IFormikSelectProps<V>): JSX.Element {
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
  props: IFieldProps & IFormikSelectProps<V>
) => withField<IFormikSelectProps<V>>(FormikSelect)(props)
