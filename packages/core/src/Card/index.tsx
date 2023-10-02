import { HTMLAttributes, FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { shape, spacing } from '../designparams'
import { CARD_PADDING } from './padding'

export * from './CardHeader'
export * from './CardFooter'
export * from './CardTabs'

type BaseElement = HTMLDivElement
type BaseProps = HTMLAttributes<BaseElement>

const CardDiv = styled.div`
  overflow: hidden;
  height: 100%;

  ${({ theme }) => css`
    background-color: ${theme.color.background00()};
    color: ${theme.color.text01()};
    box-shadow: ${theme.shadow.card};
  `};
`
const CardContainer = styled(CardDiv)<{
	readonly width: CardWidthType
	readonly square: boolean
}>`
  flex: none;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  width: ${({ width }) =>
		width === 'full' ? '100%' : width === 'small' ? '400px' : '600px'};

  ${({ square }) =>
		square
			? undefined
			: css`
          border-radius: ${shape.radius.large};
        `}
`
const PanelCardContainer = styled(CardDiv)<{
	readonly width: CardWidthType
	readonly square: boolean
}>`
  width: 100%;
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-width: ${({ width }) =>
		width === 'full' ? '100%' : width === 'small' ? '400px' : '600px'};

  ${({ square }) =>
		square
			? undefined
			: css`
          border-radius: ${shape.radius.large};
        `}
`

export const CardPlainContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
  padding: 0 ${CARD_PADDING};
`

export const CardContent = styled(CardPlainContent)`
  padding: ${spacing.large} ${CARD_PADDING} ${spacing.huge};
`

export type CardWidthType = 'small' | 'medium' | 'full'

export interface CardProps extends BaseProps {
	readonly children?: ReactNode
	/**
	 * `class` to be passed to the component.
	 */
	readonly className?: BaseProps['className']
	/**
	 * The width of the card, one of `'small'`, `'medium'` or `'full'`.
	 *
	 * Default: `'full'`
	 */
	readonly width?: CardWidthType
	/**
	 * Gives border-radius if it is `false`.
	 *
	 * Default: `true`.
	 */
	readonly square?: boolean
}

export const Card: FC<CardProps> = ({
	width = 'full',
	square = true,
	children,
	...props
}) => (
	<CardContainer width={width} square={square} {...props}>
		{children}
	</CardContainer>
)

export const PanelCard: FC<CardProps> = ({
	width = 'full',
	square = true,
	children,
	...props
}) => (
	<PanelCardContainer width={width} square={square} {...props}>
		{children}
	</PanelCardContainer>
)
