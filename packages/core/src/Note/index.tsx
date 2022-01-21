import React from 'react'

import styled from 'styled-components'
import { Typography } from '../Typography'
import { Icon, IconType } from '../Icon'
import { spacing } from '../designparams'

type BaseElement = HTMLDivElement
type BaseProps = React.HTMLAttributes<BaseElement>

const NoteWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${({ theme }) => theme.color.text03()};
`

const NoteIcon = styled(Icon)`
  flex: none;
  align-self: flex-start;
  color: ${({ theme }) => theme.color.text05()};
`

const NoteTextWrapper = styled.div`
  margin-left: ${spacing.medium};
`

export interface NoteProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Used to input text.
   */
  readonly text: string
  /**
   * The icon element.
   */
  readonly icon: IconType
}

export const Note: React.FunctionComponent<NoteProps> = ({
  text,
  icon,
  ...props
}) => (
  <NoteWrapper {...props}>
    <NoteIcon icon={icon} />
    <NoteTextWrapper>
      <Typography variant="default-text">{text}</Typography>
    </NoteTextWrapper>
  </NoteWrapper>
)
