export interface IComponent {
  readonly name: string
  readonly route: string
  readonly menu: string
  readonly component: React.FC
}

export type Components = ReadonlyArray<IComponent>

// From react-docgen-typescript

export interface IStringIndexedObject<T> {
  readonly [key: string]: T
}

export interface IComponentDoc {
  readonly displayName: string
  readonly description: string
  readonly props: IProps
}

export interface IProps extends IStringIndexedObject<IPropItem> {}

export interface IPropItem {
  readonly name: string
  readonly required: boolean
  readonly type: IPropItemType
  readonly description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly defaultValue: any
}

export interface IPropItemType {
  readonly name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly value?: any
  readonly raw?: string
}
