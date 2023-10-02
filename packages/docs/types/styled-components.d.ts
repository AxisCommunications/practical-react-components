// import original module declarations
import 'styled-components'
import { Theme } from 'practical-react-components-core'

// and extend them!
declare module 'styled-components' {
	export type DefaultTheme = Theme
}
