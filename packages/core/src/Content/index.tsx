import React, { useCallback } from 'react'

import styled, { css } from 'styled-components'
import { spacing, componentSize } from '../designparams'

import { Typography } from '../Typography'
import { Divider as DividerTemplate } from '../Divider'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

/**
 * Common padding of content in Dialog/Card
 */
export const CONTENT_PADDING = spacing.extraLarge

/**
 * TextBlock
 *
 * Without caption, the block is 40px height.
 * With caption, the block has 8px padding to top and bottom.
 *
 * */

const Block = styled.div<{ readonly hasCaption: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ hasCaption }) =>
    hasCaption
      ? css`
          padding: ${spacing.medium} 0;
        `
      : css`
          > * {
            display: flex;
            align-items: center;
            height: ${componentSize.medium};
          }
        `}
`

const DefaultText = styled(Typography)`
  color: ${({ theme }) => theme.color.text01()};
`
const Caption = styled(Typography)`
  color: ${({ theme }) => theme.color.text03()};
`

interface TextBlockProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  readonly text: string
  readonly caption?: string
}
export const TextBlock: React.FC<TextBlockProps> = ({
  text,
  caption,
  ...props
}) => {
  const hasCaption = caption !== undefined
  return (
    <Block hasCaption={hasCaption} {...props}>
      <DefaultText>{text}</DefaultText>
      {caption !== undefined ? (
        <Caption variant="caption">{caption}</Caption>
      ) : undefined}
    </Block>
  )
}

/**
 * SpaceBlock
 *
 * A block for adjusting space between elements in Dialog/Card.
 *
 * */

export const SpaceBlock = styled.div<{ readonly variant: 8 | 16 | 24 | 32 }>`
  width: 100%;
  height: ${({ variant }) =>
    variant === 8
      ? spacing.medium
      : variant === 16
      ? spacing.large
      : variant === 24
      ? spacing.extraLarge
      : spacing.huge};
`

/**
 * ContentDivider
 *
 * It shows an edge to edge divider line in a content
 */

export const ContentDivider = styled(DividerTemplate)`
  margin: 0 -${CONTENT_PADDING};
`

/**
 * FormSection
 *
 * It takes optional title and gives margin-bottom 8px to all children.
 */

const FormContainer = styled.div`
  > * {
    margin-bottom: ${spacing.medium};
  }
`

const TitleContainer = styled.div`
  height: ${componentSize.medium};
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.text04()};
  cursor: default;
  text-transform: uppercase;
`

const GroupTitle: React.FC<{
  readonly title: string
}> = ({ title }) => {
  return (
    <TitleContainer>
      <Typography variant="group-title">{title}</Typography>
    </TitleContainer>
  )
}

interface FormSectionProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  readonly title?: string
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <>
      {title !== undefined ? <GroupTitle title={title} /> : undefined}
      {children !== undefined ? (
        <FormContainer {...props}>{children}</FormContainer>
      ) : undefined}
    </>
  )
}

/**
 * List parts in a content
 */

type ListHeightType = 'medium' | 'large'

export const ContentListItem = styled.div<{
  readonly listHeight?: ListHeightType
}>`
  margin: 0 -${CONTENT_PADDING};
  padding: 0 ${CONTENT_PADDING};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${({ listHeight }) =>
    listHeight === 'medium' || listHeight === undefined
      ? componentSize.medium
      : componentSize.large};

  &:hover {
    background-color: ${({ theme }) => theme.color.background03()};
  }

  > :first-child {
    width: 100%;
  }
`

interface ContentListItemWithHoverProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  readonly listHeight?: ListHeightType
  readonly onHover: (hover: boolean) => void
}

export const ContentListItemWithHover: React.FC<
  ContentListItemWithHoverProps
> = ({ listHeight = 'medium', onHover, children, ...props }) => {
  const handleMouseEnter = useCallback(() => {
    onHover(true)
  }, [onHover])
  const handleMouseLeave = useCallback(() => {
    onHover(false)
  }, [onHover])

  return (
    <ContentListItem
      listHeight={listHeight}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </ContentListItem>
  )
}
