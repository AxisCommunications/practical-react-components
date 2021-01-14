import React from 'react'
import styled from 'styled-components'

import { spacing } from '../../designparams'
import { DIALOG_PADDING } from './padding'

/**
 * Content
 *
 * Simple div to base other sections on. It comes with a default padding to make
 * sure this isn't left out of anything put in the dialog body. Sections can be
 * used inside the content and have edgeless variants counteracting the padding.
 */
const BaseSection = styled.div`
  position: relative;
  max-height: 100%;
  color: ${({ theme }) => theme.color.text01()};
`

export const Section = styled(BaseSection)`
  padding: 0 ${DIALOG_PADDING};
`

/**
 * Provides a container that horizontally centers its contents
 */
export const CenteredSection = styled(Section)`
  align-items: center;
`

/**
 * Provides a container that removes the left and right padding
 * provided by `Content`, using a negative margin
 */
export const EdgeToEdgeSection = styled(Section)`
  margin: 0 -${DIALOG_PADDING};
`

/**
 * Scrollable section
 */

const ScrollContainer = styled(Section)`
  overflow-y: auto;
  /**
    * Prevent pushing content, but only supported in WebKit-based (e.g., Safari)
    * and Blink-based (e.g., Chrome or Opera) browsers.
    */
  overflow-y: overlay;
`

interface IScrollSection {
  readonly className?: string
  readonly maxHeight?: string
  readonly scrollRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

export const ScrollSection: React.FunctionComponent<IScrollSection> = ({
  className,
  maxHeight,
  scrollRef,
  children,
}) => (
  <ScrollContainer className={className} ref={scrollRef} style={{ maxHeight }}>
    {children}
  </ScrollContainer>
)

/* stylelint-disable selector-type-no-unknown  */
export const MainSection = styled(ScrollSection)<{
  readonly hasHeader: boolean
  readonly scrollRef: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}>`
  padding-top: ${({ hasHeader }) => (hasHeader ? '0' : spacing.extraLarge)};
  padding-bottom: 48px;
`
