import { ReactNode, ReactElement, ReactPortal } from 'react'
import ReactDOM from 'react-dom'

ReactDOM.createPortal = jest.fn((c: ReactNode) => {
  const element = c as ReactElement<Element>
  return (<div>{element.props.children}</div>) as ReactPortal
})
