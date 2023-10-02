import { FC } from 'react'
import { useField } from 'formik'
import { Switch, SwitchProps, withField } from 'practical-react-components-core'

export interface FormikSwitchProps
	extends Omit<SwitchProps, 'name' | 'checked'>,
		Partial<Pick<SwitchProps, 'checked'>> {
	readonly name: string
}

export const FormikSwitch: FC<FormikSwitchProps> = ({
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
