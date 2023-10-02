import {
	useRef,
	useCallback,
	useState,
	InputHTMLAttributes,
	ChangeEventHandler,
	FC,
} from 'react'
import styled from 'styled-components'
import { Typography } from '../Typography'
import { spacing } from '../designparams'
import { Button, ButtonProps } from '../Button'

type BaseElement = HTMLInputElement
type BaseProps = InputHTMLAttributes<BaseElement>
type InputChangeHandler = ChangeEventHandler<BaseElement>

const ButtonFileChooserContainer = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  > button {
    margin-right: ${spacing.medium};
  }
`

const FileInput = styled.input`
  display: none;
`

export interface FilePickerProps
	extends Pick<ButtonProps, 'variant' | 'accent' | 'label' | 'icon'>,
		BaseProps {
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * Callback that fires when user has chosen a file.
	 * @param file the chosen file
	 */
	readonly onFileChange?: (file?: File) => void
}

/**
 * FilePicker
 *
 * Can be used when file input from user is needed.
 *
 * The component is built with a Button component. When the user
 * clicks the button a input file chooser dialog will appear.
 *
 */
export const FilePicker: FC<FilePickerProps> = ({
	onFileChange,
	disabled,
	name,
	variant,
	label,
	icon,
	className,
	onChange,
	...props
}) => {
	const ref = useRef<HTMLInputElement>(null)
	const [fileName, setFileName] = useState('')
	const onButtonClick = useCallback(() => {
		if (ref.current !== null) {
			ref.current.click()
		}
	}, [ref])
	const handleFileChange = useCallback<InputChangeHandler>(
		e => {
			onChange?.(e)
			const chosenFile = e.target.files?.[0]

			if (chosenFile === undefined) {
				return
			}

			setFileName(chosenFile.name)
			onFileChange?.(chosenFile)
		},
		[onFileChange, onChange]
	)

	return (
		<ButtonFileChooserContainer className={className}>
			<Button
				disabled={disabled}
				name={name}
				onClick={onButtonClick}
				variant={variant}
				className={className}
				label={label}
				type="button"
				icon={icon}
			/>
			<FileInput type="file" ref={ref} onChange={handleFileChange} {...props} />
			<Typography variant="default-text">{fileName}</Typography>
		</ButtonFileChooserContainer>
	)
}
