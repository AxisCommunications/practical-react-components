import {
	useReducer,
	useContext,
	useRef,
	FC,
	isValidElement,
	cloneElement,
	ReactNode,
	Attributes,
} from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled, { css } from 'styled-components'

import { spacing, shape } from '../designparams'

import { BaseToast } from './Toast'
import { toastReducer } from './toastReducer'

import { useToastCallbacks, SimpleToastsDurations } from './useToasts'
import { ToastsContext } from './context'

export interface ToastsPlacement {
	readonly justify: 'center' | 'right'
	readonly top: string
}

const ToastsWrapper = styled.div<ToastsPlacement>`
  position: fixed;
  top: ${({ top }) => top};
  width: 360px;
  border-radius: ${shape.radius.medium};
  margin: ${spacing.medium} ${spacing.large};

  ${({ justify }) =>
		justify === 'center'
			? css`
          left: 50%;
          transform: translateX(-50%);
        `
			: css`
          right: 0;
        `}
`

interface ToastsProviderProps extends SimpleToastsDurations {
	readonly children?: ReactNode
}

interface ToastTransitionProps {
	readonly children?: ReactNode
}

/**
 *
 * Toasts provider
 *
 * Used to provide a context for dispatching toast actions.
 *
 * Note: Do not use this directly! Instead use the `useToasts` hook which wraps
 * the dispatch ref.
 *
 */
export const ToastsProvider: FC<ToastsProviderProps> = ({
	children,
	...toastsOptions
}) => {
	const [toasts, dispatch] = useReducer(toastReducer, new Map())

	const callbacks = useToastCallbacks(dispatch, toastsOptions)

	return (
		<ToastsContext.Provider value={{ ...callbacks, dispatch, toasts }}>
			{children}
		</ToastsContext.Provider>
	)
}

export const ToastTransition: FC<ToastTransitionProps> = ({
	children,
	...props
}) => {
	const ref = useRef<HTMLDivElement | null>(null)

	return (
		<CSSTransition
			nodeRef={ref}
			classNames="practical"
			appear={true}
			timeout={400}
			mountOnEnter={true}
			unmountOnExit={true}
			{...props}
		>
			{isValidElement(children)
				? cloneElement(children, { ref } as Attributes)
				: null}
		</CSSTransition>
	)
}

export interface ToastsAnchorProps {
	/**
	 * Where the toasts should be placed.
	 *
	 * Default: top right
	 */
	readonly placement: ToastsPlacement
}

export const ToastsAnchor: FC<ToastsAnchorProps> = ({ placement }) => {
	return (
		<ToastsWrapper {...placement}>
			<ToastContent />
		</ToastsWrapper>
	)
}

export const ToastContent = () => {
	const { hideToast, toasts } = useContext(ToastsContext)
	return (
		<TransitionGroup component={null}>
			{[...toasts.entries()].map(([id, props], index) => (
				<ToastTransition key={id}>
					<BaseToast
						key={id}
						toastId={id}
						zIndex={-index}
						dismissToast={hideToast}
						{...props}
					/>
				</ToastTransition>
			))}
		</TransitionGroup>
	)
}
