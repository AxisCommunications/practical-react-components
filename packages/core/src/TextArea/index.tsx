import {
	useCallback,
	TextareaHTMLAttributes,
	ChangeEventHandler,
	FC,
	RefObject,
	KeyboardEventHandler,
} from 'react'

import styled, { css } from 'styled-components'
import { opacity, spacing, shape } from '../designparams'
import { withField } from '../utils'
import { Typography } from '../Typography'

const TEXT_AREA_HEIGHT = '96px'

const ErrorContainer = styled.div`
  color: ${({ theme }) => theme.color.elementError()};
  line-height: 16px;
  background-color: transparent;
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  pointer-events: none;
`

const ErrorLineContainter = styled.div`
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.elementError()};
  height: 100%;
  width: 100%;
  flex-shrink: 1;
  pointer-events: none;
`

const ErrorLine = styled.div<{ readonly hasErrorMessage: boolean }>`
  position: absolute;
  bottom: -1px;
  height: 2px;
  width: 100%;
  background-color: transparent;
  border-radius: ${({ hasErrorMessage }) =>
		hasErrorMessage
			? `${shape.radius.small} 0 0 0`
			: `${shape.radius.small} ${shape.radius.small} 0 0`};
`

const ErrorMessage = styled.div`
  padding: 0 8px;
  position: relative;
  bottom: -46px;
  pointer-events: none;
`

const FocusLine = styled.div`
  position: absolute;
  bottom: -2px;
  height: 2px;
  width: 100%;
  background-color: transparent;
  border-radius: ${shape.radius.small} ${shape.radius.small} 0 0;
`

const TextAreaNative = styled.textarea`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};
  display: unset;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.text01()};
  background-color: transparent;
  border-width: 0;
  padding: ${spacing.medium};
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.color.text05()};
  }

  &:focus {
    outline: none;
  }

  &:read-only {
    opacity: ${opacity[48]};
  }
`

const TextAreaContainer = styled.div<{
	readonly disabled: boolean
	readonly hasError: boolean
}>`
  height: ${TEXT_AREA_HEIGHT};
  position: relative;
  flex: auto;
  box-sizing: border-box;
  border-width: 0;
  background-color: ${({ theme }) => theme.color.background02()};
  border-bottom: 1px solid ${({ theme }) => theme.color.element11()};
  border-radius: ${shape.radius.medium} ${shape.radius.medium} 0 0;
  padding-bottom: ${spacing.medium};

  &:hover {
    background-color: ${({ theme }) => theme.color.background01()};
    border-bottom: 1px solid ${({ theme }) => theme.color.element01()};
  }

  &:focus-within {
    background-color: ${({ theme }) => theme.color.backgroundPrimary()};
    border-bottom: 2px solid transparent;
    padding-bottom: 7px;
  }

  &:focus-within ${FocusLine} {
    background-color: ${({ theme }) => theme.color.elementPrimary()};
  }

  &:focus-within ${ErrorLine} {
    background-color: ${({ theme }) => theme.color.elementError()};
  }

  &:focus-within ${ErrorLineContainter} {
    border-bottom: 1px solid transparent;
  }

  ${({ disabled }) =>
		disabled
			? css`
          opacity: ${opacity[48]};

          &:hover {
            background-color: ${({ theme }) => theme.color.background02()};
            border-bottom: 1px solid ${({ theme }) => theme.color.element11()};
          }
        `
			: undefined}

  ${({ theme, hasError }) =>
		hasError
			? css`
          background-color: ${theme.color.backgroundError()};
          border-bottom: none;

          &:hover {
            background-color: ${theme.color.backgroundError()};
            border-bottom: none;
          }

          &:focus-within {
            background-color: ${theme.color.backgroundError()};
            padding-bottom: ${spacing.medium};
            border-bottom: none;
          }
        `
			: undefined};
`

type BaseElement = HTMLTextAreaElement
type BaseProps = TextareaHTMLAttributes<BaseElement>

export type TextAreaChangeHandler = ChangeEventHandler<BaseElement>
export type TextAreaValueChangeHandler = (value: string) => void

export interface TextAreaProps extends BaseProps {
	/**
	 * Specifies the name of an input element.
	 */
	readonly name?: BaseProps['name']
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: string
	/**
	 * The value of the input element.
	 */
	readonly value?: BaseProps['value']
	/**
	 * Native change handler that can be used by formik etc.
	 */
	readonly onChange?: TextAreaChangeHandler

	/**
	 * Smooth typed value change handler.
	 */
	readonly onValueChange?: TextAreaValueChangeHandler
	/**
	 * Executes an action when the Enter key is pressed.
	 */
	readonly onPressEnter?: () => void
	/**
	 * Executes an action when the Esc key is pressed.
	 */
	readonly onPressEscape?: () => void
	/**
	 * Adds an error message underneath the text area.
	 */
	readonly error?: string | undefined
	/**
	 * Can be used to set React ref to the textarea element
	 */
	readonly textareaRef?: RefObject<BaseElement>
}

export const TextArea: FC<TextAreaProps> = ({
	onChange,
	onValueChange,
	onPressEnter,
	onPressEscape,
	disabled = false,
	error,
	onKeyUp,
	className,
	textareaRef,
	...props
}) => {
	const handleKeyUp = useCallback<KeyboardEventHandler<BaseElement>>(
		e => {
			onKeyUp?.(e)
			switch (e.key) {
				case 'Enter': {
					onPressEnter?.()
					break
				}

				case 'Esc':
				case 'Escape': {
					onPressEscape?.()
					break
				}
			}
		},
		[onPressEnter, onPressEscape, onKeyUp]
	)

	const handleChange = useCallback<TextAreaChangeHandler>(
		e => {
			onChange?.(e)
			onValueChange?.(e.target.value)
		},
		[onChange, onValueChange]
	)

	return (
		<TextAreaContainer
			className={className}
			disabled={disabled}
			hasError={error !== undefined}
		>
			<TextAreaNative
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={false}
				rows={3}
				disabled={disabled}
				{...props}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				ref={textareaRef}
			/>
			{error !== undefined ? (
				<ErrorContainer>
					<ErrorLineContainter>
						<ErrorLine hasErrorMessage={error !== ''} />
					</ErrorLineContainter>
					{error !== '' ? (
						<ErrorMessage>
							<Typography variant="explanatory-text">{error}</Typography>
						</ErrorMessage>
					) : null}
				</ErrorContainer>
			) : (
				<FocusLine />
			)}
		</TextAreaContainer>
	)
}

export const TextAreaField = withField<TextAreaProps>(TextArea)
