import {
	useCallback,
	useMemo,
	useLayoutEffect,
	FC,
	createRef,
	KeyboardEvent,
} from 'react'
import styled from 'styled-components'

import { spacing } from '../designparams'
import { TextInputProps, TextInput } from './Input'
import { Select } from '../Select'
import { withField } from '../utils/withField'
import { TranslationMeridiem } from '../DateTimePicker'

enum TimeFormat {
	AM = 'AM',
	PM = 'PM',
}

enum Format {
	HHMMSS = 'hh:mm:ss',
	HHMM = 'hh:mm',
	MMSS = 'mm:ss',
	HH = 'hh',
	MM = 'mm',
	SS = 'ss',
}
type FormatVariants = 'hh:mm:ss' | 'hh:mm' | 'mm:ss' | 'hh' | 'mm' | 'ss'

const BACKSPACE_KEY = 'Backspace'
const DELETE_KEY = 'Delete'

interface TimeContainerProps {
	readonly hour12: boolean
}

const TimeContainer = styled.div<TimeContainerProps>`
  display: grid;
  grid-template-columns: ${({ hour12 }) => (hour12 ? '72px 64px' : '144px')};
  grid-column-gap: ${spacing.medium};
  align-items: end;
`

interface TimeValues {
	readonly hour?: number
	readonly minute?: number
	readonly second?: number
}

/**
 * Time input only has a max length of two numbers so maximum number is 99
 */
const MAX_INPUT_VALUE = 100

/**
 * Used to control the cursors position when state updates.
 */
let inputPos = 0

const isNewValuesValid = ({ hour, minute, second }: TimeValues) => {
	const hourValidate = hour ?? 0
	const minuteValidate = minute ?? 0
	const secondValidate = second ?? 0
	return hourValidate < 24 && minuteValidate < 60 && secondValidate < 60
}

const isNewDurationValuesValid = ({ hour, minute, second }: TimeValues) => {
	let maxMinute = 60
	let maxSecond = 60
	const maxHour = 100
	if (hour === undefined) {
		maxMinute = MAX_INPUT_VALUE
	}
	if (minute === undefined) {
		maxSecond = MAX_INPUT_VALUE
	}
	const hourValidate = hour ?? 0
	const minuteValidate = minute ?? 0
	const secondValidate = second ?? 0

	return (
		hourValidate < maxHour &&
		minuteValidate < maxMinute &&
		secondValidate < maxSecond
	)
}

enum CursorPositions {
	BeforeFirstColon = 2,
	BeforeSecondColon = 5,
	AfterFirstColon = 3,
	AfterSecondColon = 6,
}
/**
 * Gets the next caret position
 * @param position Current caret position
 * @param backspace If backspace was pressed
 */
const getTargetPos = (position: number, backspace: boolean) => {
	if (!backspace) {
		switch (position) {
			case CursorPositions.BeforeFirstColon:
			case CursorPositions.BeforeSecondColon:
				return position + 1
			default:
				return position
		}
	}

	switch (position) {
		case CursorPositions.AfterFirstColon:
		case CursorPositions.AfterSecondColon:
			return position - 2
		default:
			return position - 1
	}
}

/**
 * Moves the cursor one extra position if next to a colon
 *
 * @param position
 * @param backspace
 */
const moveCursor = (position: number, backspace: boolean) => {
	if (!backspace) {
		switch (position) {
			case CursorPositions.BeforeFirstColon:
			case CursorPositions.BeforeSecondColon:
				return position + 1
			default:
				return position
		}
	}

	switch (position) {
		case CursorPositions.AfterFirstColon:
		case CursorPositions.AfterSecondColon:
			return position - 1
		default:
			return position
	}
}

const convertToTwentyFour = (hour: number, ampm: TimeFormat) => {
	let nextHour = hour
	if (nextHour === 0) {
		// 0 does not exist on AM/PM so it can be converted to 1 instead.
		nextHour = 1
	}
	if (ampm === TimeFormat.AM) {
		return nextHour === 12 ? 0 : nextHour
	}
	return nextHour === 12 ? nextHour : nextHour + 12
}

const SECONDS_PER_HOUR = 3600
const SECONDS_PER_MINUTE = 60

const parseSecondsToFormat = (value: number, format: FormatVariants) => {
	let sec = value

	let hour
	let minute
	let second

	switch (format) {
		case Format.HHMMSS:
			hour = Math.floor(sec / SECONDS_PER_HOUR)
			sec %= SECONDS_PER_HOUR
			minute = Math.floor((sec % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
			second = sec % SECONDS_PER_MINUTE
			break
		case Format.HHMM:
			hour = Math.floor(sec / SECONDS_PER_HOUR)
			sec %= SECONDS_PER_HOUR
			minute = Math.floor((sec % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE)
			break
		case Format.MMSS:
			minute = Math.floor(sec / SECONDS_PER_MINUTE)
			second = sec % SECONDS_PER_MINUTE
			break
		case Format.HH:
			hour = Math.floor(sec / SECONDS_PER_HOUR)
			break
		case Format.MM:
			minute = Math.floor(sec / SECONDS_PER_MINUTE)
			break
		case Format.SS:
			second = sec
			break
		default:
	}

	return {
		hour,
		minute,
		second,
	}
}

const parseToAMPM = (hour: string | undefined) => {
	if (hour === undefined) {
		return undefined
	}
	const hourAMPM = parseInt(hour) % 12
	return (hourAMPM === 0 ? 12 : hourAMPM).toString()
}

const getKeyCodeValue = (key: string) => {
	const backspace = key === BACKSPACE_KEY
	return {
		keyValue: backspace || key === DELETE_KEY ? '0' : key,
		backspace,
	}
}

export type BaseTimeInputProps = Omit<
	TextInputProps,
	| 'value'
	| 'onValueChange'
	| 'onChange'
	| 'ref'
	| 'width'
	| 'maxLength'
	| 'placeholder'
>

export interface TimeInputValues {
	readonly hour?: number
	readonly minute?: number
	readonly second?: number
}

export interface TimeInputProps extends BaseTimeInputProps {
	/**
	 * If `true` will show and set the time in AM/PM format,
	 * `false` will show and set time in 24 hour format.
	 */
	readonly hour12?: boolean
	/**
	 * Initial value in seconds, will be parsed into the given format.
	 */
	readonly value: TimeInputValues
	/**
	 * Callback that returns the amount of seconds in TimeInput.
	 *
	 * returns seconds
	 */
	readonly onChange: (value: TimeInputValues) => void
	/**
	 * AM/PM translation labels
	 *
	 * Default `AM` and `PM`
	 */
	readonly hour12MeridiemLabels?: TranslationMeridiem
}

/**
 * Time input component
 *
 * The time input uses a text input box to
 * write time, the input forces the user to enter
 * in a specific format e.g. (hh:mm:ss).
 *
 * When variant `hour12` is `false` the time input will act as a 24 hour input.
 *
 * When property `hour12` is `true`, the input is
 * postfixed with am/pm, and the hours can only go
 * from 01 to 12, there is also a select besides the input component
 * that lets the user to choose between AM and PM.
 *
 * Duration input component (DurationInput)
 *
 * Is a variant of TimeInput but the highest time unit
 * in the input are not limited in value (can go up to max 99).
 */
export const TimeInput: FC<TimeInputProps> = ({
	value,
	onChange,
	hour12 = false,
	hour12MeridiemLabels = { am: 'AM', pm: 'PM' },
	...props
}) => {
	const inputElement = createRef<HTMLInputElement>()
	const { hour, minute, second } = useMemo(() => value, [value])

	const inputValue = useMemo(() => {
		const hourString = hour12
			? parseToAMPM(hour?.toString())?.padStart(2, '0')
			: hour?.toString().padStart(2, '0')
		const minuteString = minute?.toString().padStart(2, '0')
		const secondsString = second?.toString().padStart(2, '0')
		return [hourString, minuteString, secondsString]
			.filter((stringValue: string | undefined) => stringValue !== undefined)
			.join(':')
	}, [hour, minute, second, hour12])
	const timeFormat = useMemo(
		() => (hour !== undefined && hour < 12 ? TimeFormat.AM : TimeFormat.PM),
		[hour]
	)

	const onTimeFormatSelect = useCallback(
		(newTimeFormat: TimeFormat) => {
			const newCallbackValues = inputValue
				.split(':')
				.reduce<TimeValues>((acc, v) => {
					if (hour !== undefined && acc.hour === undefined) {
						return {
							hour: convertToTwentyFour(parseInt(v), newTimeFormat),
						}
					} else if (minute !== undefined && acc.minute === undefined) {
						return { ...acc, minute: parseInt(v) }
					} else if (second !== undefined && acc.second === undefined) {
						return { ...acc, second: parseInt(v) }
					}
					return acc
				}, {})
			onChange(newCallbackValues)
		},
		[inputValue, onChange, hour, minute, second]
	)

	const ampmOptions = useMemo(
		() => [
			{ value: TimeFormat.AM, label: hour12MeridiemLabels.am },
			{ value: TimeFormat.PM, label: hour12MeridiemLabels.pm },
		],
		[hour12MeridiemLabels]
	)

	const setCursorPosition = useCallback(
		(newPos: number) => {
			if (
				inputElement.current !== null &&
				document.activeElement === inputElement.current
			) {
				inputElement.current.setSelectionRange(newPos, newPos)
			}
		},
		[inputElement]
	)

	useLayoutEffect(
		() => setCursorPosition(inputPos),
		[inputValue, setCursorPosition]
	)

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			const { keyValue, backspace } = getKeyCodeValue(event.key)
			// If the key pressed is not a number
			if (!/^\d$/.test(keyValue)) {
				return
			}

			// Find input position and get target position for the new value.
			event.preventDefault()
			const { currentTarget } = event
			const currentValue = currentTarget.value
			inputPos = getTargetPos(
				currentTarget.selectionStart ?? currentValue.length,
				backspace
			)

			// If at last position of input, no need write anything just return
			if (currentValue.length <= inputPos || inputPos === -1) {
				return
			}

			const newInputValue = `${currentValue.substring(
				0,
				inputPos
			)}${keyValue}${currentValue.substring(inputPos + 1, currentValue.length)}`
			const newCallbackValues = newInputValue
				.split(':')
				.reduce<TimeValues>((acc, v) => {
					let number = parseInt(v)
					if (number >= MAX_INPUT_VALUE) {
						number = MAX_INPUT_VALUE - 1
					}
					if (hour !== undefined && acc.hour === undefined) {
						return {
							hour: hour12 ? convertToTwentyFour(number, timeFormat) : number,
						}
					} else if (minute !== undefined && acc.minute === undefined) {
						return { ...acc, minute: number }
					} else if (second !== undefined && acc.second === undefined) {
						return { ...acc, second: number }
					}
					return acc
				}, {})

			if (!isNewValuesValid(newCallbackValues)) {
				return
			}

			// If we pressed backspace we want to stay at current position we have else move 1 forward
			inputPos += backspace ? 0 : 1
			inputPos = moveCursor(inputPos, backspace)

			// If the value is the same as before we need to set the cursors position
			// because useEffect does not run.
			if (newInputValue === inputValue) {
				setCursorPosition(inputPos)
			}
			onChange(newCallbackValues)
		},
		[
			onChange,
			inputValue,
			hour,
			minute,
			second,
			setCursorPosition,
			hour12,
			timeFormat,
		]
	)

	return (
		<TimeContainer hour12={hour12}>
			<TextInput
				value={inputValue}
				inputRef={inputElement}
				onKeyDown={onKeyDown}
				{...props}
			/>
			{hour12 && hour !== undefined ? (
				<Select
					variant="transparent"
					value={timeFormat}
					options={ampmOptions}
					onChange={onTimeFormatSelect}
					compact={props.compact}
				/>
			) : null}
		</TimeContainer>
	)
}

export interface DurationInputProps extends BaseTimeInputProps {
	/**
	 * Initial value in seconds, will be parsed into the given format.
	 */
	readonly value: number
	/**
	 * Callback that returns the amount of seconds in TimeInput.
	 *
	 * returns seconds
	 */
	readonly onChange: (value: number) => void
	/**
	 * Sets the format of the input.
	 * hh:mm:ss, hh:mm, mm:ss, hh, mm, ss are valid format.
	 */
	readonly format: FormatVariants
}

/**
 * Duration input component
 *
 * Is a variant of TimeInput but the highest time unit
 * in the input are not limited in value (can go up to max 99).
 */
export const DurationInput: FC<DurationInputProps> = ({
	value,
	onChange,
	format,
	...props
}) => {
	const inputElement = createRef<HTMLInputElement>()
	const { hour, minute, second } = useMemo(
		() => parseSecondsToFormat(value, format),
		[value, format]
	)
	const inputValue = useMemo(() => {
		const hourString = hour?.toString().padStart(2, '0')
		const minuteString = minute?.toString().padStart(2, '0')
		const secondsString = second?.toString().padStart(2, '0')
		return [hourString, minuteString, secondsString]
			.filter((stringValue: string | undefined) => stringValue !== undefined)
			.join(':')
	}, [hour, minute, second])

	const setCursorPosition = useCallback(
		(newPos: number) => {
			if (
				inputElement.current !== null &&
				document.activeElement === inputElement.current
			) {
				inputElement.current.setSelectionRange(newPos, newPos)
			}
		},
		[inputElement]
	)

	useLayoutEffect(
		() => setCursorPosition(inputPos),
		[inputValue, setCursorPosition]
	)

	const onKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			const { keyValue, backspace } = getKeyCodeValue(event.key)

			// If the key pressed is not a number
			if (!/^\d$/.test(keyValue)) {
				return
			}

			// Find input position and get target position for the new value.
			event.preventDefault()
			const { currentTarget } = event
			const currentValue = currentTarget.value
			inputPos = getTargetPos(
				currentTarget.selectionStart ?? currentValue.length,
				backspace
			)

			// If at last position of input, or backspace at first position
			if (currentValue.length <= inputPos || inputPos === -1) {
				// no need write anything just return
				return
			}

			const newInputValue = `${currentValue.substring(
				0,
				inputPos
			)}${keyValue}${currentValue.substring(inputPos + 1, currentValue.length)}`
			const newCallbackValues = newInputValue
				.split(':')
				.reduce<TimeValues>((acc, v) => {
					let number = parseInt(v)
					if (number >= MAX_INPUT_VALUE) {
						number = MAX_INPUT_VALUE - 1
					}
					if (hour !== undefined && acc.hour === undefined) {
						return { hour: number }
					} else if (minute !== undefined && acc.minute === undefined) {
						return { ...acc, minute: number }
					} else if (second !== undefined && acc.second === undefined) {
						return { ...acc, second: number }
					}
					return acc
				}, {})

			if (!isNewDurationValuesValid(newCallbackValues)) {
				return
			}

			// If we pressed backspace we want to stay at current position we have else move 1 forward
			inputPos += backspace ? 0 : 1
			inputPos = moveCursor(inputPos, backspace)

			// If the value is the same as before we need to set the cursors position
			// because useEffect does not run.
			if (newInputValue === inputValue) {
				setCursorPosition(inputPos)
			}
			onChange(
				(newCallbackValues.hour ?? 0) * SECONDS_PER_HOUR +
					(newCallbackValues.minute ?? 0) * SECONDS_PER_MINUTE +
					(newCallbackValues.second ?? 0)
			)
		},
		[onChange, inputValue, hour, minute, second, setCursorPosition]
	)

	return (
		<TimeContainer hour12={false}>
			<TextInput
				value={inputValue}
				inputRef={inputElement}
				onKeyDown={onKeyDown}
				{...props}
			/>
		</TimeContainer>
	)
}

export const TimeInputField = withField<TimeInputProps>(TimeInput)
export const DurationInputField = withField<DurationInputProps>(DurationInput)
