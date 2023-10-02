// import original module declarations
import 'styled-components'
import { Theme } from '../src/theme'

// and extend them!
declare module 'styled-components' {
	export interface DefaultTheme extends Theme {}
}
