import { FC } from 'react'
import { useField, FieldConfig } from 'formik'
import {
	DurationInput,
	DurationInputProps,
	withField,
} from 'practical-react-components-core'

export interface FormikDurationInputProps
	extends Omit<DurationInputProps, 'name' | 'value' | 'onChange'>,
		Partial<Pick<DurationInputProps, 'value' | 'onChange'>>,
		Pick<FieldConfig, 'name' | 'validate'> {}

export const FormikDurationInput: FC<FormikDurationInputProps> = ({
	name,
	validate,
	...props
}) => {
	const [field, meta, { setValue }] = useField({ name, validate })

	return (
		<DurationInput
			{...field}
			onChange={setValue}
			error={meta.touched ? meta.error : undefined}
			{...props}
		/>
	)
}

export const FormikDurationInputField = withField(FormikDurationInput)
