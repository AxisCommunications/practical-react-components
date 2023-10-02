import {
	useCallback,
	useState,
	useEffect,
	useLayoutEffect,
	Children,
	ReactElement,
	cloneElement,
	ReactNode,
	FC,
} from 'react'
import styled, { css } from 'styled-components'
import { useBoolean } from 'react-hooks-shareable'

import { Typography, TypographyProps } from '../Typography'
import { PopOver, PopOverProps } from '../PopOver'
import { shape, spacing, componentSize } from '../designparams'
import { font } from '../theme'
import { useTouchScrollDistance } from './utils'

/**
 * Tooltip
 *
 * A small info shown on hover.
 * Positioned below the anchor element,
 * aligned to it's center.
 */

export const TOOLTIP_DELAY_MS = 250

const BaseTooltipWrapper = styled.div`
  display: flex;
  max-width: 280px;
  border-radius: ${shape.radius.small};

  > * {
    white-space: pre-line;
  }
`

const TooltipWrapper = styled(BaseTooltipWrapper)`
  align-items: center;

  margin: ${spacing.small};
  padding: ${spacing.small} ${spacing.medium};

  min-height: ${componentSize.mini};

  color: ${({ theme }) => theme.color.background00()};
  background-color: ${({ theme }) => theme.color.text04()};
`

export const ExpandedTooltipAnimation = css`
  animation: fadein 200ms ease-out;

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`

const ExpandedTooltipWrapper = styled(BaseTooltipWrapper)`
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.medium};

  margin: ${spacing.medium};
  padding: ${spacing.medium};

  height: auto;

  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ theme }) => theme.color.background00()};
  box-shadow: ${({ theme }) => theme.shadow.tooltip};

  word-break: break-word;

  ${ExpandedTooltipAnimation}
`

const ExpandedTooltipTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  white-space: nowrap;
  gap: ${spacing.medium};
`

const ExpandedTooltipTitle = styled(Typography).attrs({
	variant: 'chip-tag-text',
})`
  font-weight: ${font.fontWeight.semibold};
  white-space: normal;
`

const ExpandedTooltipExtraInfo = styled(Typography).attrs({
	variant: 'compact-label',
})``

const StyledExpandedTooltipTypography = styled(Typography).attrs({
	variant: 'chip-tag-text',
})`
  white-space: normal;
`

export const ExpandedTooltipTypography: FC<Omit<TypographyProps, 'variant'>> =
	({ children }) => (
		<StyledExpandedTooltipTypography>
			{children}
		</StyledExpandedTooltipTypography>
	)

const upDownArrowBase = css`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
`
const TooltipUpArrow = styled.div`
  ${upDownArrowBase};
  margin-top: 3px;
  border-bottom: 5px solid ${({ theme }) => theme.color.background00()};
`
const TooltipDownArrow = styled.div`
  ${upDownArrowBase};
  margin-bottom: 3px;
  border-top: 5px solid ${({ theme }) => theme.color.background00()};
`

const leftRightArrowBase = css`
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
`
const TooltipLeftArrow = styled.div`
  ${leftRightArrowBase};
  margin-left: 3px;
  border-right: 5px solid ${({ theme }) => theme.color.background00()};
`
const TooltipRightArrow = styled.div`
  ${leftRightArrowBase};
  margin-right: 3px;
  border-left: 5px solid ${({ theme }) => theme.color.background00()};
`

type Placement = 'up' | 'right' | 'down' | 'left'

const pointInBounds = (pos: readonly [number, number]) =>
	pos[0] >= 0 &&
	pos[0] <= document.documentElement.clientWidth &&
	pos[1] >= 0 &&
	pos[1] <= document.documentElement.clientHeight

const rectInBounds = (
	pos: readonly [number, number],
	size: readonly [number, number]
) => pointInBounds(pos) && pointInBounds([pos[0] + size[0], pos[1] + size[1]])

const alignments: Record<
	Placement,
	Required<
		Pick<
			PopOverProps,
			| 'horizontalPosition'
			| 'horizontalAlignment'
			| 'verticalPosition'
			| 'verticalAlignment'
		>
	>
> = {
	up: {
		horizontalPosition: 'center',
		horizontalAlignment: 'center',
		verticalPosition: 'top',
		verticalAlignment: 'bottom',
	},
	down: {
		horizontalPosition: 'center',
		horizontalAlignment: 'center',
		verticalPosition: 'bottom',
		verticalAlignment: 'top',
	},
	left: {
		horizontalPosition: 'left',
		horizontalAlignment: 'right',
		verticalPosition: 'center',
		verticalAlignment: 'center',
	},
	right: {
		horizontalPosition: 'right',
		horizontalAlignment: 'left',
		verticalPosition: 'center',
		verticalAlignment: 'center',
	},
}

const arrows: Record<Placement, ReactElement> = {
	left: <TooltipRightArrow />,
	right: <TooltipLeftArrow />,
	up: <TooltipDownArrow />,
	down: <TooltipUpArrow />,
}

export interface TooltipProps extends Omit<PopOverProps, 'anchorEl'> {
	/**
	 * Optional Tooltip variant.
	 * Default: `default`
	 */
	readonly variant?: 'default'
	/**
	 * text inside the tooltip.
	 */
	readonly text: string
}

export interface ExpandedTooltipProps extends Omit<PopOverProps, 'anchorEl'> {
	readonly children?: ReactNode
	/**
	 * Required Tooltip variant.
	 */
	readonly variant: 'expanded'
	/**
	 * Optional placement.
	 * Default: `up-down`
	 */
	readonly placement?: 'up-down' | 'left-right'
	/**
	 * Optional semibold title text inside the tooltip.
	 */
	readonly tipTitle?: string
	/**
	 * Optional extra info shown in the right corner.
	 */
	readonly extraInfo?: string
	/**
	 * React element that will appear under the tipTitle.
	 * Recommend to use `ExpandedTooltipTypography` to get proper Typography.
	 */
	readonly contents: ReactNode
}

export const Tooltip: FC<TooltipProps | ExpandedTooltipProps> = ({
	children,
	...props
}) => {
	const placement =
		(props.variant === 'expanded' ? props.placement : undefined) ?? 'up-down'
	const child = Children.only(children) as ReactElement
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	// State for click
	const [visibleByClick, showByClick] = useState(false)
	// Delayed state for pointer
	const [visibleDelayed, showDelayed, hideDelayed] = useBoolean(false)
	// State for pointer
	const [debouncedVisible, setDebouncedVisible] = useState(false)
	const [layout, setLayout] = useState<Placement>('down')
	const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null)

	// If tooltip should be shown
	const visible = visibleByClick || debouncedVisible

	const touchScrollDistance = useTouchScrollDistance()

	const toggle = useCallback(
		(event: PointerEvent) => {
			// When using touch instead of mouse, we have to toggle the tooltip
			// on "pointerdown" instead of "pointerover" and "pointerout"
			if (event.pointerType === 'mouse') {
				return
			}

			showByClick(v => !v)
		},
		[showByClick]
	)

	/**
	 * If the delta for any axis is larger than 150 pixels,
	 * remove the tooltip from the screen.
	 */
	useLayoutEffect(() => {
		if (!visible) {
			return
		}
		const { x, y } = touchScrollDistance
		if (Math.max(Math.abs(x), Math.abs(y)) > 150) {
			showByClick(false)
		}
	}, [touchScrollDistance])

	useEffect(() => {
		const delayVisible = () => setDebouncedVisible(visibleDelayed)
		const delayed = setTimeout(delayVisible, TOOLTIP_DELAY_MS)
		return () => {
			clearTimeout(delayed)
		}
	}, [visibleDelayed])

	useLayoutEffect(() => {
		if (anchorEl === null) {
			return
		}
		// Events when using a pointer
		anchorEl.addEventListener('pointerover', showDelayed)
		anchorEl.addEventListener('pointerout', hideDelayed)
		// Event when using touch
		anchorEl.addEventListener('pointerdown', toggle)
		return () => {
			anchorEl.removeEventListener('pointerover', showDelayed)
			anchorEl.removeEventListener('pointerout', hideDelayed)
			anchorEl.removeEventListener('pointerdown', toggle)
		}
	}, [anchorEl, hideDelayed, showDelayed, toggle])

	useLayoutEffect(() => {
		if (tooltipEl === null || anchorEl === null) {
			return
		}

		const bounds = anchorEl.getBoundingClientRect()

		// "16" is for space of margin of ExpandedTooltipWrapper + arrow size.
		const tooltipSize: [number, number] = [
			tooltipEl.clientWidth + 16,
			tooltipEl.clientHeight + 16,
		]
		const tooltipMid = [
			bounds.left + (bounds.right - bounds.left) / 2,
			bounds.top + (bounds.bottom - bounds.top) / 2,
		]

		const spaces: Record<Placement, boolean> = {
			down: rectInBounds(
				[tooltipMid[0] - tooltipSize[0] / 2, bounds.bottom],
				tooltipSize
			),
			up: rectInBounds(
				[tooltipMid[0] - tooltipSize[0] / 2, bounds.top - tooltipSize[1]],
				tooltipSize
			),
			left: rectInBounds(
				[bounds.left - tooltipSize[0], tooltipMid[1] - tooltipSize[1] / 2],
				tooltipSize
			),
			right: rectInBounds(
				[bounds.right, tooltipMid[1] - tooltipSize[1] / 2],
				tooltipSize
			),
		}

		if (placement === 'up-down') {
			if (spaces.up || spaces.down) {
				setLayout(spaces.down ? 'down' : 'up')
			} else {
				setLayout(spaces.right ? 'right' : 'left')
			}
		} else if (placement === 'left-right') {
			if (spaces.right || spaces.left) {
				setLayout(spaces.right ? 'right' : 'left')
			} else {
				setLayout(spaces.up ? 'up' : 'down')
			}
		}
	}, [anchorEl, tooltipEl, props, placement])

	if (props.variant !== 'expanded') {
		return (
			<>
				{cloneElement(child, {
					ref: setAnchorEl,
				})}
				{visible ? (
					<PopOver anchorEl={anchorEl} {...alignments[layout]} {...props}>
						<TooltipWrapper ref={setTooltipEl}>
							<Typography variant="chip-tag-text">{props.text}</Typography>
						</TooltipWrapper>
					</PopOver>
				) : null}
			</>
		)
	}

	const { tipTitle, extraInfo, contents } = props

	return (
		<>
			{cloneElement(child, {
				ref: setAnchorEl,
			})}
			{visible ? (
				<>
					<PopOver anchorEl={anchorEl} {...alignments[layout]} {...props}>
						<ExpandedTooltipWrapper ref={setTooltipEl}>
							{tipTitle !== undefined || extraInfo !== undefined ? (
								extraInfo !== undefined ? (
									<ExpandedTooltipTop>
										<ExpandedTooltipTitle>{tipTitle}</ExpandedTooltipTitle>
										<ExpandedTooltipExtraInfo>
											{extraInfo}
										</ExpandedTooltipExtraInfo>
									</ExpandedTooltipTop>
								) : (
									<ExpandedTooltipTitle>{tipTitle}</ExpandedTooltipTitle>
								)
							) : null}
							{contents}
						</ExpandedTooltipWrapper>
					</PopOver>
					<PopOver anchorEl={anchorEl} {...alignments[layout]}>
						{arrows[layout]}
					</PopOver>
				</>
			) : null}
		</>
	)
}
