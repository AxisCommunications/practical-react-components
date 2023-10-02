import {
	useCallback,
	useMemo,
	InputHTMLAttributes,
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	PointerEventHandler,
} from 'react'

import styled, { css } from 'styled-components'
import { useVisibleFocus } from 'react-hooks-shareable'
import { shape, opacity } from '../designparams'
import { Typography } from '../Typography'
import { withField } from '../utils'

const BoxHalo = styled.div`
  position: absolute;
  top: 3px;
  left: 3px;
  height: 18px;
  width: 18px;
  border-radius: ${shape.radius.small};
  transition: transform 100ms;
  pointer-events: none;
`

const Container = styled.div<{
	readonly disabled: boolean
	readonly checked: boolean
	readonly partial: boolean
	readonly hasLabel: boolean
	readonly visibleFocus: boolean
}>`
  position: relative;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;

  ${({ disabled }) =>
		disabled
			? css`
          opacity: ${opacity[48]};
          pointer-events: none;
        `
			: undefined}

  &:hover ${BoxHalo} {
    background-color: ${({ checked, partial, theme }) =>
			checked || partial
				? theme.color.elementPrimary(opacity[16])
				: theme.color.element11(opacity[16])};
    transform: scale(1.77);
  }

  &:focus-within {
    outline: none;
    ${({ visibleFocus, checked, partial, theme }) =>
			visibleFocus
				? css`
            ${BoxHalo} {
              background-color: ${
								checked || partial
									? theme.color.elementPrimary(opacity[16])
									: theme.color.element11(opacity[16])
							};
              transform: scale(1.77);
            }
            ${CSSBlankCheckbox}, ${CSSCheckboxChecked}, ${CSSCheckboxIndeterminate} {
              border: 2px solid ${theme.color.textPrimary()};
            }
          `
				: undefined}
  }

  &:active {
    ${({ checked, partial, theme }) =>
			checked || partial
				? css`
            ${BoxHalo} {
              background-color: ${theme.color.elementPrimary(opacity[24])};
              transform: scale(1.88);
            }
            ${CSSCheckboxChecked}, ${CSSCheckboxIndeterminate} {
              background-color: ${theme.color.textPrimary()};
            }
          `
				: css`
            ${BoxHalo} {
              background-color: ${theme.color.element11(opacity[24])};
              transform: scale(1.88);
            }
            ${CSSBlankCheckbox} {
              border: 2px solid ${theme.color.text02()};
            }
          `}
  }

  ${({ hasLabel }) =>
		hasLabel
			? css`
          width: auto;
          justify-content: flex-start;
          padding-left: 3px;
          > span {
            margin-left: 28px;
          }
        `
			: undefined}
`

const BoxNative = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  display: unset;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
`

const BaseCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border-radius: ${shape.radius.small};
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  position: absolute;
`

const CSSCheckboxChecked = styled(BaseCheckbox)`
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  ::after {
    content: '';
    width: 5px;
    height: 10px;
    border: solid ${({ theme }) => theme.color.element17()};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    margin-bottom: 3px;
  }
`

const CSSCheckboxIndeterminate = styled(BaseCheckbox)`
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  ::after {
    content: '';
    width: 10px;
    height: 2px;
    background-color: ${({ theme }) => theme.color.element17()};
    border-radius: ${shape.radius.small};
  }
`

const CSSBlankCheckbox = styled(BaseCheckbox)`
  border: 2px solid ${({ theme }) => theme.color.element01()};
`
type BaseElement = HTMLInputElement
type BaseProps = InputHTMLAttributes<BaseElement>

export type CheckboxChangeHandler = ChangeEventHandler<BaseElement>
export type CheckboxValueChangeHandler = (value: boolean) => void

export interface CheckboxProps extends BaseProps {
	/**
	 * Specifies the name of an input element.
	 */
	readonly name?: BaseProps['name']
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: string
	/**
	 * If `true`, the component is checked.
	 */
	readonly checked: boolean
	/**
	 * Native change handler that can be used by formik etc.
	 */
	readonly onChange?: CheckboxChangeHandler

	/**
	 * A label for the checkbox
	 */
	readonly label?: string
	/**
	 * If `true`, the component is partially checked.
	 */
	readonly partial?: boolean

	/**
	 * Set as true when checkbox checked as checked.
	 */
	readonly onCheckedValueChange?: CheckboxValueChangeHandler
	/**
	 * Set as true when checkbox checked as partial.
	 */
	readonly onPartialValueChange?: CheckboxValueChangeHandler
}

export const Checkbox: FC<CheckboxProps> = ({
	checked,
	label,
	disabled = false,
	onChange,
	onCheckedValueChange,
	onPartialValueChange,
	onFocus,
	onPointerUp,
	onPointerDown,
	partial = false,
	className,
	...props
}) => {
	const { isPointerOn, isPointerOff, determineVisibleFocus, visibleFocus } =
		useVisibleFocus()

	const handleChange = useCallback<ChangeEventHandler<BaseElement>>(
		e => {
			onChange?.(e)
			if (partial) {
				if (
					onPartialValueChange !== undefined &&
					onCheckedValueChange !== undefined
				) {
					onPartialValueChange(false)
					onCheckedValueChange(false)
				}
			} else if (onCheckedValueChange !== undefined) {
				onCheckedValueChange(e.target.checked)
			}
		},
		[partial, onChange, onCheckedValueChange, onPartialValueChange]
	)

	const handleFocus = useCallback<FocusEventHandler<BaseElement>>(
		e => {
			onFocus?.(e)
			determineVisibleFocus()
		},
		[determineVisibleFocus, onFocus]
	)

	const handlePointerUp = useCallback<PointerEventHandler<BaseElement>>(
		e => {
			onPointerUp?.(e)
			isPointerOff()
		},
		[isPointerOff, onPointerUp]
	)

	const handlePointerDown = useCallback<PointerEventHandler<BaseElement>>(
		e => {
			onPointerDown?.(e)
			isPointerOn()
		},
		[isPointerOn, onPointerDown]
	)

	const CheckBoxIcon = useMemo(() => {
		return partial ? (
			<CSSCheckboxIndeterminate />
		) : checked ? (
			<CSSCheckboxChecked />
		) : (
			<CSSBlankCheckbox />
		)
	}, [partial, checked])

	const CheckboxLabel = useMemo(() => {
		return label !== undefined ? (
			<Typography variant="navigation-label">{label}</Typography>
		) : null
	}, [label])

	const hasLabel = label !== undefined

	return (
		<Container
			className={className}
			disabled={disabled}
			checked={checked}
			partial={partial}
			hasLabel={hasLabel}
			visibleFocus={visibleFocus}
		>
			<BoxHalo />
			{CheckBoxIcon}
			{CheckboxLabel}
			<BoxNative
				type="checkbox"
				checked={checked}
				disabled={disabled}
				{...props}
				onChange={handleChange}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
				onFocus={handleFocus}
			/>
		</Container>
	)
}

export const CheckboxField = withField<CheckboxProps>(Checkbox)
