import { FC, ReactNode } from 'react'

export interface FocusTrapProps {
  readonly children?: ReactNode
}

const FocusTrap: FC<FocusTrapProps> = ({ children }) => {
  return <>{children}</>
}

/* eslint-disable-next-line import/no-default-export */
export default FocusTrap
