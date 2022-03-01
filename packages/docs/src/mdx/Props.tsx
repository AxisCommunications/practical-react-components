import { FC } from 'react'
import { Typography, spacing } from 'practical-react-components-core'
import { ComponentDoc } from '../types'
import styled from 'styled-components'

import propsList from '../props.json'

const PropValue = styled(Typography)`
  font-family: monospace;
  word-break: break-word;
`

const PropTitle = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: ${spacing.medium};
`

const PropTitleOptional = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color.text05()};
`

const PropTitleOptionalDefault = styled.span`
  font-weight: 600;
  font-family: monospace;
`

const PropDescription = styled(Typography)`
  font-size: 14px;
`

const PropItem = styled.div`
  padding: ${spacing.large} 0;
  border-bottom: 1px solid lightgray;
  display: grid;
  grid-template-columns: 5fr 2fr;
  grid-gap: ${spacing.huge};
`

const PropTable = styled.div`
  margin: ${spacing.large} 0;
`

const PropInfo = styled.div`
  align-self: end;
`

interface PropsProps {
  readonly props: ReadonlyArray<ComponentDoc>
  readonly of: string
}

const PropsList: FC<PropsProps> = ({ of, props }) => {
  const componentProps = props.find(({ displayName }) => displayName === of)

  if (componentProps === undefined) {
    return null
  }

  return (
    <PropTable>
      {Object.values(componentProps.props).map(prop => (
        <PropItem key={prop.name}>
          <div>
            <PropTitle>
              {prop.name}

              {!prop.required ? (
                <>
                  {' '}
                  <PropTitleOptional>
                    (optional
                    {prop.defaultValue !== null ? (
                      <>
                        {`, default: `}
                        <PropTitleOptionalDefault>
                          {JSON.stringify(prop.defaultValue.value)}
                        </PropTitleOptionalDefault>
                      </>
                    ) : null}
                    )
                  </PropTitleOptional>
                </>
              ) : null}
            </PropTitle>
            <PropDescription>{prop.description}</PropDescription>
          </div>
          <PropInfo>
            <PropValue>{prop.type.name}</PropValue>
          </PropInfo>
        </PropItem>
      ))}
    </PropTable>
  )
}

export const Props = styled(PropsList).attrs({
  props: propsList as unknown as ReadonlyArray<ComponentDoc>,
})``
