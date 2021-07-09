import React, {
  useState,
  useEffect,
  useLayoutEffect,
  Children,
  ReactElement,
} from 'react'
import styled from 'styled-components'
import { useBoolean } from 'react-hooks-shareable'

import { Typography, TypographyProps } from '../Typography'
import { PopOver, PopOverProps } from '../PopOver'
import { shape, spacing, componentSize } from '../designparams'
import { font } from '../theme'

/**
 * Tooltip
 *
 * A small info shown on hover.
 * Positioned below the anchor element,
 * aliigned to it's center.
 */

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

  margin-top: ${spacing.small};
  padding: ${spacing.small} ${spacing.medium};

  min-height: ${componentSize.mini};

  color: ${({ theme }) => theme.color.background00()};
  background-color: ${({ theme }) => theme.color.text04()};
`

const ExpandedTooltipWrapper = styled(BaseTooltipWrapper)`
  flex-direction: column;
  align-items: flex-start;
  gap: ${spacing.medium};

  margin: ${spacing.medium} ${spacing.small};
  padding: ${spacing.medium};

  height: auto;

  color: ${({ theme }) => theme.color.text01()};
  background-color: ${({ theme }) => theme.color.background00()};
  box-shadow: ${({ theme }) => theme.shadow.tooltip};

  word-break: break-word;

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
`

const ExpandedTooltipExtraInfo = styled(Typography).attrs({
  variant: 'compact-label',
})``

const StyledExpandedTooltipTypography = styled(Typography).attrs({
  variant: 'chip-tag-text',
})`
  white-space: normal;
`

export const ExpandedTooltipTypography: React.FC<
  Omit<TypographyProps, 'variant'>
> = ({ children }) => (
  <StyledExpandedTooltipTypography>{children}</StyledExpandedTooltipTypography>
)

const ToolTipUpArrow = styled.div`
  width: 0;
  height: 0;
  margin: 3px ${spacing.medium} 0 ${spacing.medium};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid ${({ theme }) => theme.color.background00()};
`
const ToolTipDownArrow = styled.div`
  width: 0;
  height: 0;
  margin: 0 ${spacing.medium} 3px ${spacing.medium};
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${({ theme }) => theme.color.background00()};
`

interface TooltipProps extends Omit<PopOverProps, 'anchorEl'> {
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

interface ExpandedTooltipProps extends Omit<PopOverProps, 'anchorEl'> {
  /**
   * Required Tooltip variant.
   */
  readonly variant: 'expanded'
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
  readonly contents: React.ReactNode
}

export const Tooltip: React.FC<TooltipProps | ExpandedTooltipProps> = ({
  children,
  ...props
}) => {
  const child = Children.only(children) as ReactElement
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const [visible, show, hide] = useBoolean(false)

  const [debouncedVisible, setDebouncedVisible] = useState(visible)
  const [hasOverflow, setHasOverflow] = useState(false)
  const [horizontalLayout, setHorizontalLayout] = useState<
    'left' | 'right' | 'center'
  >('center')
  const [tooltipEl, setTooltipEl] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const delayVisible = () => setDebouncedVisible(visible)
    const delayed = setTimeout(delayVisible, 250)
    return () => {
      clearTimeout(delayed)
    }
  }, [visible])

  useLayoutEffect(() => {
    if (anchorEl === null) {
      return
    }
    anchorEl.addEventListener('pointerover', show)
    anchorEl.addEventListener('pointerout', hide)
    return () => {
      anchorEl.removeEventListener('pointerover', show)
      anchorEl.removeEventListener('pointerout', hide)
    }
  }, [anchorEl, hide, show])

  useLayoutEffect(() => {
    if (tooltipEl === null || anchorEl === null) {
      return
    }

    const { bottom } = anchorEl.getBoundingClientRect()

    const bottomSpace = document.documentElement.clientHeight - bottom
    // See if `bottomSpace` is smaller than Tooltip height.
    // "8" is margin of the TooltipWrapper.
    setHasOverflow(tooltipEl.clientHeight + 8 > bottomSpace)

    const { left, right } = tooltipEl.getBoundingClientRect()
    if (left < 0) {
      setHorizontalLayout('left')
    } else if (right > document.documentElement.clientWidth) {
      setHorizontalLayout('right')
    }
  }, [anchorEl, tooltipEl])

  if (props.variant !== 'expanded') {
    return (
      <>
        {React.cloneElement(child, {
          ref: setAnchorEl,
        })}
        {debouncedVisible ? (
          <PopOver
            anchorEl={anchorEl}
            horizontalPosition={horizontalLayout}
            horizontalAlignment={horizontalLayout}
            verticalPosition={hasOverflow ? 'top' : 'bottom'}
            verticalAlignment={hasOverflow ? 'bottom' : 'top'}
            {...props}
          >
            <TooltipWrapper ref={setTooltipEl}>
              <Typography variant="chip-tag-text">{props.text}</Typography>
            </TooltipWrapper>
          </PopOver>
        ) : null}
      </>
    )
  }

  return (
    <>
      {React.cloneElement(child, {
        ref: setAnchorEl,
      })}
      {debouncedVisible ? (
        <>
          <PopOver
            anchorEl={anchorEl}
            horizontalPosition={horizontalLayout}
            horizontalAlignment={horizontalLayout}
            verticalPosition={hasOverflow ? 'top' : 'bottom'}
            verticalAlignment={hasOverflow ? 'bottom' : 'top'}
            {...props}
          >
            <ExpandedTooltipWrapper ref={setTooltipEl}>
              {props.tipTitle !== undefined || props.extraInfo !== undefined ? (
                props.extraInfo !== undefined ? (
                  <ExpandedTooltipTop>
                    <ExpandedTooltipTitle>
                      {props.tipTitle}
                    </ExpandedTooltipTitle>
                    <ExpandedTooltipExtraInfo>
                      {props.extraInfo}
                    </ExpandedTooltipExtraInfo>
                  </ExpandedTooltipTop>
                ) : (
                  <ExpandedTooltipTitle>{props.tipTitle}</ExpandedTooltipTitle>
                )
              ) : null}
              {props.contents}
            </ExpandedTooltipWrapper>
          </PopOver>
          <PopOver
            anchorEl={anchorEl}
            horizontalPosition="center"
            horizontalAlignment="center"
            verticalPosition={hasOverflow ? 'top' : 'bottom'}
            verticalAlignment={hasOverflow ? 'bottom' : 'top'}
          >
            {hasOverflow ? <ToolTipDownArrow /> : <ToolTipUpArrow />}
          </PopOver>
        </>
      ) : null}
    </>
  )
}
