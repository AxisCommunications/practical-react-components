import {
	useCallback,
	useLayoutEffect,
	useRef,
	useState,
	FC,
	MouseEvent,
} from 'react'
import styled, { css } from 'styled-components'

import { spacing, opacity, shape } from '../designparams'
import { Typography } from '../Typography'

const BoxHalo = styled.div.attrs<{ readonly width: number }>(({ width }) => ({
	style: { width: `calc(${width}px + ${spacing.large})` },
}))<{ readonly width: number }>`
  position: absolute;
  transform: scaleX(0);
  height: -webkit-fill-available;
  border-radius: ${shape.radius.small};
  transition: transform 100ms;
  pointer-events: none;
`

export interface Tick {
	/**
	 * Position of the tick along the slider
	 */
	readonly position: number
	/**
	 * Label for the tickMarker, eg. `°`
	 */
	readonly label?: string
	/**
	 * If to display the marker or not. Default `true`
	 */
	readonly marker?: boolean
}

const BaseTick = styled.div.attrs<{
	readonly center: number
}>(({ center }) => ({
	style: {
		left: `${center}%`,
	},
}))<{
	readonly center: number
}>`
  position: absolute;
  bottom: 0px;
  background-color: ${({ theme }) => theme.color.text00()};

  width: 2px;
  height: 2px;
  border-radius: 50%;
`

export const TickLabelContainer = styled.div`
  position: relative;
  height: 16px;
  width: ${`calc(100% - ${parseInt(spacing.large)}px)`};
  left: 8px;
`

const LabelContainer = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const BaseLabel = styled.div.attrs<{
	readonly center: number
	readonly width: number
}>(({ center, width }) => ({
	style: (() => {
		if (center === 0) {
			return {
				left: 0,
			}
		}

		if (center === 100) {
			return { right: 0 }
		}

		return {
			left: `calc(${center}% - ${width / 2}px)`,
		}
	})(),
}))<{
	readonly center: number
	readonly width: number
	readonly disabled: boolean
}>`
  position: absolute;
  cursor: pointer;

  &:hover ${BoxHalo} {
    background-color: ${({ theme }) => theme.color.element11(opacity[24])};
    transform: scaleX(1);
  }

  ${({ disabled }) =>
		disabled
			? css`
          pointer-events: none;
          opacity: ${opacity[48]};
        `
			: undefined};
`

const Label = styled(Typography).attrs({
	variant: 'explanatory-text',
})`
  color: ${({ theme }) => theme.color.text04()};
`

export const TickMarker: FC<Omit<Tick, 'label'>> = ({ position, marker }) => (
	<>{marker === true ? <BaseTick center={position} /> : null}</>
)

interface TickLabelProps {
	/**
	 * The value to display for the tick.
	 * Is overriden by `label`
	 */
	readonly value: number
	/**
	 * Position of the tick along the slider
	 */
	readonly position: number
	/**
	 * Label for the tickMarker, eg. `°`
	 */
	readonly label?: string
	/**
	 * If `true`, the tick label will be disabled
	 */
	readonly disabled?: boolean
	/**
	 * Executes JavaScript when clicking the value.
	 */
	readonly handleChange: (value: number) => void
}

export const TickLabel: FC<TickLabelProps> = ({
	position,
	label,
	value,
	handleChange,
	disabled = false,
}) => {
	const [width, setWidth] = useState<number>(0)
	const el = useRef<HTMLDivElement | null>(null)

	const handleClick = useCallback(
		(event: MouseEvent<HTMLAnchorElement>) => {
			event.stopPropagation()
			handleChange(value)
		},
		[handleChange, value]
	)

	useLayoutEffect(() => {
		if (el.current === null) {
			return
		}

		setWidth(el.current.clientWidth)
	}, [])

	return (
		<BaseLabel ref={el} center={position} width={width} disabled={disabled}>
			<LabelContainer onClick={handleClick}>
				<BoxHalo width={width}></BoxHalo>
				<Label>{label === undefined ? value : label}</Label>
			</LabelContainer>
		</BaseLabel>
	)
}
