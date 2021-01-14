import React, { useCallback, useMemo } from 'react'
import { useField, FieldConfig } from 'formik'
import {
  SelectField,
  ISelectProps,
  IOption,
  withField,
} from 'practical-react-components-core'

interface IFormikNumberSelectOptions extends Omit<IOption, 'value'> {
  readonly value: number
}

interface IFormikNumberSelectProps
  extends Omit<ISelectProps, 'name' | 'value' | 'options'>,
    Pick<FieldConfig, 'name' | 'validate'> {
  readonly options: ReadonlyArray<IFormikNumberSelectOptions>
  readonly value?: number
}

export const FormikNumberSelect: React.FC<IFormikNumberSelectProps> = ({
  name,
  validate,
  options,
  value,
  ...props
}) => {
  const [field, meta, { setValue, setTouched }] = useField<number>({
    name,
    validate,
  })
  const optionString = useMemo(
    () => options.map<IOption>(v => ({ ...v, value: v.value.toString() })),
    [options]
  )
  const onBlur = useCallback(() => setTouched(true), [setTouched])
  const onChange = useCallback(
    (selectValue: string) => setValue(Number(selectValue)),
    [setValue]
  )
  return (
    <SelectField
      {...field}
      onChange={onChange}
      onBlur={onBlur}
      options={optionString}
      value={value === undefined ? field.value.toString() : value.toString()}
      error={meta.touched ? meta.error : undefined}
      {...props}
    />
  )
}

export const FormikNumberSelectField = withField(FormikNumberSelect)
