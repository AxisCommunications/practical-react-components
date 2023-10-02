import { FC, ReactNode } from 'react'

export interface FocusTrapProps {
	readonly children?: ReactNode
}

const FocusTrap: FC<FocusTrapProps> = ({ children }) => {
	return <>{children}</>
}

export default FocusTrap
