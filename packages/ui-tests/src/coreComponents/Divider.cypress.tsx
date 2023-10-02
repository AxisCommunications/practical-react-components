import styled from 'styled-components'

import { Divider } from 'practical-react-components-core'

export const meta = {
	name: 'Divider',
	route: '/components/Divider',
	menu: '',
}

const Wrapper = styled.div`
  height: 40px;
`

const Test = () => (
	<>
		<Wrapper>
			<Divider data-cy="divider" variant="full" />
		</Wrapper>
		<Wrapper>
			<Divider data-cy="divider-middle" variant="middle" />
		</Wrapper>
		<Wrapper>
			<Divider data-cy="divider-inset-default" variant="inset" />
		</Wrapper>
		<Wrapper>
			<Divider data-cy="divider-inset-custom" variant="inset" insetSize={112} />
		</Wrapper>
	</>
)

export default Test
