import { FC } from 'react'
import { useField, FieldConfig } from 'formik'
import {
	TextInput,
	TextInputProps,
	withField,
} from 'practical-react-components-core'

export interface FormikTextInputProps
	extends Omit<TextInputProps, 'name' | 'value'>,
		Partial<Pick<TextInputProps, 'value'>>,
		Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikTextInput: FC<FormikTextInputProps> = ({
	name,
	validate,
	...props
}) => {
	const [field, meta] = useField({ name, validate })

	return (
		<TextInput
			{...field}
			error={meta.touched ? meta.error : undefined}
			{...props}
		/>
	)
}

export const FormikTextInputField = withField(FormikTextInput)
