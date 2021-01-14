import React from 'react'
import { useField } from 'formik'
import {
  Switch,
  ISwitchProps,
  withField,
} from 'practical-react-components-core'

export interface IFormikSwitchProps
  extends Omit<ISwitchProps, 'name' | 'checked'>,
    Partial<Pick<ISwitchProps, 'checked'>> {
  readonly name: string
}

export const FormikSwitch: React.FC<IFormikSwitchProps> = ({
  name,
  value,
  ...props
}) => {
  const [field] = useField<string>({
    name,
    value,
    type: 'checkbox',
  })
  const { checked, ...rest } = field

  return <Switch {...rest} checked={checked ?? false} {...props} />
}

export const FormikSwitchField = withField(FormikSwitch)
