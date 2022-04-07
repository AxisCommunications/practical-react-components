import { FC } from 'react'
import { IconType } from 'practical-react-components-core'

export interface Component {
  readonly name: string
  readonly route: string
  readonly menu: string
  readonly icon?: IconType
  readonly component: FC
}

export type Components = ReadonlyArray<Component>

// From react-docgen-typescript

export interface StringIndexedObject<T> {
  readonly [key: string]: T
}

export interface ComponentDoc {
  readonly displayName: string
  readonly description: string
  readonly props: Props
}

export interface Props extends StringIndexedObject<PropItem> {}

export interface PropItem {
  readonly name: string
  readonly required: boolean
  readonly type: PropItemType
  readonly description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly defaultValue: any
}

export interface PropItemType {
  readonly name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly value?: any
  readonly raw?: string
}
