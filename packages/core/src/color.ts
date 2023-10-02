/**
 * Theme definitions for styled components
 */
type RGB = readonly [number, number, number]

/**
 * Create a color that is a shade of grey
 * @param brightness The level of white in grey (0 = black, 100 = white)
 */
export const grey = (brightness = 100): RGB => {
	const l = Math.round(Math.max(0, Math.min((brightness / 100) * 255, 255)))
	return [l, l, l]
}

/**
 * Convenience wrappers for allowing any color to
 * have an alpha channel.
 */
export type CSSColor = (a?: number) => string

export const createCSSColor =
	([r, g, b]: RGB): CSSColor =>
	(a?: number) =>
		a === undefined ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`

/**
 * Converting functions that rgb color to hex color
 */
const toHex = (c: number) => {
	const hex = c.toString(16)
	return hex.length === 1 ? `0${hex}` : hex
}

const rgbToHex = (r: number, g: number, b: number) => {
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export const getHexValue = (rgb: string) => {
	const a = rgb.split('(')[1].split(')')[0]
	const array = a.split(',')
	return rgbToHex(
		parseInt(array[0], 10),
		parseInt(array[1], 10),
		parseInt(array[2], 10)
	)
}

/**
 * Color palette
 */

export const basePalette = {
	black: createCSSColor([0, 0, 0]),
	grey16: createCSSColor(grey(16)),
	grey20: createCSSColor(grey(20)),
	grey24: createCSSColor(grey(24)),
	grey32: createCSSColor(grey(32)),
	grey40: createCSSColor(grey(40)),
	grey48: createCSSColor(grey(48)),
	grey64: createCSSColor(grey(64)),
	grey72: createCSSColor(grey(72)),
	grey80: createCSSColor(grey(80)),
	grey88: createCSSColor(grey(88)),
	grey90: createCSSColor(grey(90)),
	grey92: createCSSColor(grey(92)),
	grey94: createCSSColor(grey(94)),
	grey95: createCSSColor(grey(95)),
	grey96: createCSSColor(grey(96)),
	grey97: createCSSColor(grey(97)),
	grey98: createCSSColor(grey(98)),
	grey99: createCSSColor(grey(99)),
	white: createCSSColor([255, 255, 255]),
	transparent: () => 'transparent',
}

export type ColorWeight =
	| '50'
	| '100'
	| '200'
	| '300'
	| '400'
	| '500'
	| '600'
	| '700'
	| '800'
	| '900'

export type ColorSpecialWeight = 'A100' | 'A200' | 'A400' | 'A700'

export type ColorBaseName =
	| 'red'
	| 'pink'
	| 'purple'
	| 'deepPurple'
	| 'indigo'
	| 'blue'
	| 'lightBlue'
	| 'cyan'
	| 'teal'
	| 'green'
	| 'lightGreen'
	| 'lime'
	| 'yellow'
	| 'amber'
	| 'orange'
	| 'deepOrange'

export type SimpleColorBaseName = 'brown' | 'grey' | 'blueGrey'

export type ColorName =
	| `${ColorBaseName}${ColorWeight | ColorSpecialWeight}`
	| `${SimpleColorBaseName}${ColorWeight}`
	| keyof typeof basePalette

/** Material palette. See https://material.io/resources/color */
export const palette: Record<ColorName, CSSColor> = {
	...basePalette,

	red50: createCSSColor([255, 235, 238]),
	red100: createCSSColor([255, 205, 210]),
	red200: createCSSColor([239, 154, 154]),
	red300: createCSSColor([229, 115, 115]),
	red400: createCSSColor([239, 83, 80]),
	red500: createCSSColor([244, 67, 54]),
	red600: createCSSColor([229, 57, 53]),
	red700: createCSSColor([211, 47, 47]),
	red800: createCSSColor([198, 40, 40]),
	red900: createCSSColor([183, 28, 28]),
	redA100: createCSSColor([255, 138, 128]),
	redA200: createCSSColor([255, 82, 82]),
	redA400: createCSSColor([255, 23, 68]),
	redA700: createCSSColor([213, 0, 0]),

	pink50: createCSSColor([252, 228, 236]),
	pink100: createCSSColor([248, 187, 208]),
	pink200: createCSSColor([244, 143, 177]),
	pink300: createCSSColor([240, 98, 146]),
	pink400: createCSSColor([236, 64, 122]),
	pink500: createCSSColor([233, 30, 99]),
	pink600: createCSSColor([216, 27, 96]),
	pink700: createCSSColor([194, 24, 91]),
	pink800: createCSSColor([173, 20, 87]),
	pink900: createCSSColor([136, 14, 79]),
	pinkA100: createCSSColor([255, 128, 171]),
	pinkA200: createCSSColor([255, 64, 129]),
	pinkA400: createCSSColor([245, 0, 87]),
	pinkA700: createCSSColor([197, 17, 98]),

	purple50: createCSSColor([243, 229, 245]),
	purple100: createCSSColor([225, 190, 231]),
	purple200: createCSSColor([206, 147, 216]),
	purple300: createCSSColor([186, 104, 200]),
	purple400: createCSSColor([171, 71, 188]),
	purple500: createCSSColor([156, 39, 176]),
	purple600: createCSSColor([142, 36, 170]),
	purple700: createCSSColor([123, 31, 162]),
	purple800: createCSSColor([106, 27, 154]),
	purple900: createCSSColor([74, 20, 140]),
	purpleA100: createCSSColor([234, 128, 252]),
	purpleA200: createCSSColor([224, 64, 251]),
	purpleA400: createCSSColor([213, 0, 249]),
	purpleA700: createCSSColor([170, 0, 255]),

	deepPurple50: createCSSColor([237, 231, 246]),
	deepPurple100: createCSSColor([209, 196, 233]),
	deepPurple200: createCSSColor([179, 157, 219]),
	deepPurple300: createCSSColor([149, 117, 205]),
	deepPurple400: createCSSColor([126, 87, 194]),
	deepPurple500: createCSSColor([103, 58, 183]),
	deepPurple600: createCSSColor([94, 53, 177]),
	deepPurple700: createCSSColor([81, 45, 168]),
	deepPurple800: createCSSColor([69, 39, 160]),
	deepPurple900: createCSSColor([49, 27, 146]),
	deepPurpleA100: createCSSColor([179, 136, 255]),
	deepPurpleA200: createCSSColor([124, 77, 255]),
	deepPurpleA400: createCSSColor([101, 31, 255]),
	deepPurpleA700: createCSSColor([98, 0, 234]),

	indigo50: createCSSColor([232, 234, 246]),
	indigo100: createCSSColor([197, 202, 233]),
	indigo200: createCSSColor([159, 168, 218]),
	indigo300: createCSSColor([121, 134, 203]),
	indigo400: createCSSColor([92, 107, 192]),
	indigo500: createCSSColor([63, 81, 181]),
	indigo600: createCSSColor([57, 73, 171]),
	indigo700: createCSSColor([48, 63, 159]),
	indigo800: createCSSColor([40, 53, 147]),
	indigo900: createCSSColor([26, 35, 126]),
	indigoA100: createCSSColor([140, 158, 255]),
	indigoA200: createCSSColor([83, 109, 254]),
	indigoA400: createCSSColor([61, 90, 254]),
	indigoA700: createCSSColor([48, 79, 254]),

	blue50: createCSSColor([227, 242, 253]),
	blue100: createCSSColor([187, 222, 251]),
	blue200: createCSSColor([144, 202, 249]),
	blue300: createCSSColor([100, 181, 246]),
	blue400: createCSSColor([66, 165, 245]),
	blue500: createCSSColor([33, 150, 243]),
	blue600: createCSSColor([30, 136, 229]),
	blue700: createCSSColor([25, 118, 210]),
	blue800: createCSSColor([21, 101, 192]),
	blue900: createCSSColor([13, 71, 161]),
	blueA100: createCSSColor([130, 177, 255]),
	blueA200: createCSSColor([68, 138, 255]),
	blueA400: createCSSColor([41, 121, 255]),
	blueA700: createCSSColor([41, 98, 255]),

	lightBlue50: createCSSColor([225, 245, 254]),
	lightBlue100: createCSSColor([179, 229, 252]),
	lightBlue200: createCSSColor([129, 212, 250]),
	lightBlue300: createCSSColor([79, 195, 247]),
	lightBlue400: createCSSColor([41, 182, 246]),
	lightBlue500: createCSSColor([3, 169, 244]),
	lightBlue600: createCSSColor([3, 155, 229]),
	lightBlue700: createCSSColor([2, 136, 209]),
	lightBlue800: createCSSColor([2, 119, 189]),
	lightBlue900: createCSSColor([1, 87, 155]),
	lightBlueA100: createCSSColor([128, 216, 255]),
	lightBlueA200: createCSSColor([64, 196, 255]),
	lightBlueA400: createCSSColor([0, 176, 255]),
	lightBlueA700: createCSSColor([0, 145, 234]),

	cyan50: createCSSColor([224, 247, 250]),
	cyan100: createCSSColor([178, 235, 242]),
	cyan200: createCSSColor([128, 222, 234]),
	cyan300: createCSSColor([77, 208, 225]),
	cyan400: createCSSColor([38, 198, 218]),
	cyan500: createCSSColor([0, 188, 212]),
	cyan600: createCSSColor([0, 172, 193]),
	cyan700: createCSSColor([0, 151, 167]),
	cyan800: createCSSColor([0, 131, 143]),
	cyan900: createCSSColor([0, 96, 100]),
	cyanA100: createCSSColor([132, 255, 255]),
	cyanA200: createCSSColor([24, 255, 255]),
	cyanA400: createCSSColor([0, 229, 255]),
	cyanA700: createCSSColor([0, 184, 212]),

	teal50: createCSSColor([224, 242, 241]),
	teal100: createCSSColor([178, 223, 219]),
	teal200: createCSSColor([128, 203, 196]),
	teal300: createCSSColor([77, 182, 172]),
	teal400: createCSSColor([38, 166, 154]),
	teal500: createCSSColor([0, 150, 136]),
	teal600: createCSSColor([0, 137, 123]),
	teal700: createCSSColor([0, 121, 107]),
	teal800: createCSSColor([0, 105, 92]),
	teal900: createCSSColor([0, 77, 64]),
	tealA100: createCSSColor([167, 255, 235]),
	tealA200: createCSSColor([100, 255, 218]),
	tealA400: createCSSColor([29, 233, 182]),
	tealA700: createCSSColor([0, 191, 165]),

	green50: createCSSColor([232, 245, 233]),
	green100: createCSSColor([200, 230, 201]),
	green200: createCSSColor([165, 214, 167]),
	green300: createCSSColor([129, 199, 132]),
	green400: createCSSColor([102, 187, 106]),
	green500: createCSSColor([76, 175, 80]),
	green600: createCSSColor([67, 160, 71]),
	green700: createCSSColor([56, 142, 60]),
	green800: createCSSColor([46, 125, 50]),
	green900: createCSSColor([27, 94, 32]),
	greenA100: createCSSColor([185, 246, 202]),
	greenA200: createCSSColor([105, 240, 174]),
	greenA400: createCSSColor([0, 230, 118]),
	greenA700: createCSSColor([0, 200, 83]),

	lightGreen50: createCSSColor([241, 248, 233]),
	lightGreen100: createCSSColor([220, 237, 200]),
	lightGreen200: createCSSColor([197, 225, 165]),
	lightGreen300: createCSSColor([174, 213, 129]),
	lightGreen400: createCSSColor([156, 204, 101]),
	lightGreen500: createCSSColor([139, 195, 74]),
	lightGreen600: createCSSColor([124, 179, 66]),
	lightGreen700: createCSSColor([104, 159, 56]),
	lightGreen800: createCSSColor([85, 139, 47]),
	lightGreen900: createCSSColor([51, 105, 30]),
	lightGreenA100: createCSSColor([204, 255, 144]),
	lightGreenA200: createCSSColor([178, 255, 89]),
	lightGreenA400: createCSSColor([118, 255, 3]),
	lightGreenA700: createCSSColor([100, 221, 23]),

	lime50: createCSSColor([249, 251, 231]),
	lime100: createCSSColor([240, 244, 195]),
	lime200: createCSSColor([230, 238, 156]),
	lime300: createCSSColor([220, 231, 117]),
	lime400: createCSSColor([212, 225, 87]),
	lime500: createCSSColor([205, 220, 57]),
	lime600: createCSSColor([192, 202, 51]),
	lime700: createCSSColor([175, 180, 43]),
	lime800: createCSSColor([158, 157, 36]),
	lime900: createCSSColor([130, 119, 23]),
	limeA100: createCSSColor([244, 255, 129]),
	limeA200: createCSSColor([238, 255, 65]),
	limeA400: createCSSColor([198, 255, 0]),
	limeA700: createCSSColor([174, 234, 0]),

	yellow50: createCSSColor([255, 253, 231]),
	yellow100: createCSSColor([255, 249, 196]),
	yellow200: createCSSColor([255, 245, 157]),
	yellow300: createCSSColor([255, 241, 118]),
	yellow400: createCSSColor([255, 238, 88]),
	yellow500: createCSSColor([255, 235, 59]),
	yellow600: createCSSColor([253, 216, 53]),
	yellow700: createCSSColor([251, 192, 45]),
	yellow800: createCSSColor([249, 168, 37]),
	yellow900: createCSSColor([245, 127, 23]),
	yellowA100: createCSSColor([255, 255, 141]),
	yellowA200: createCSSColor([255, 255, 0]),
	yellowA400: createCSSColor([255, 234, 0]),
	yellowA700: createCSSColor([255, 214, 0]),

	amber50: createCSSColor([255, 248, 225]),
	amber100: createCSSColor([255, 236, 179]),
	amber200: createCSSColor([255, 224, 130]),
	amber300: createCSSColor([255, 213, 79]),
	amber400: createCSSColor([255, 202, 40]),
	amber500: createCSSColor([255, 193, 7]),
	amber600: createCSSColor([255, 179, 0]),
	amber700: createCSSColor([255, 160, 0]),
	amber800: createCSSColor([255, 143, 0]),
	amber900: createCSSColor([255, 111, 0]),
	amberA100: createCSSColor([255, 229, 127]),
	amberA200: createCSSColor([255, 215, 64]),
	amberA400: createCSSColor([255, 196, 0]),
	amberA700: createCSSColor([255, 171, 0]),

	orange50: createCSSColor([255, 243, 224]),
	orange100: createCSSColor([255, 224, 178]),
	orange200: createCSSColor([255, 204, 128]),
	orange300: createCSSColor([255, 183, 77]),
	orange400: createCSSColor([255, 167, 38]),
	orange500: createCSSColor([255, 152, 0]),
	orange600: createCSSColor([251, 140, 0]),
	orange700: createCSSColor([245, 124, 0]),
	orange800: createCSSColor([239, 108, 0]),
	orange900: createCSSColor([230, 81, 0]),
	orangeA100: createCSSColor([255, 209, 128]),
	orangeA200: createCSSColor([255, 171, 64]),
	orangeA400: createCSSColor([255, 145, 0]),
	orangeA700: createCSSColor([255, 109, 0]),

	deepOrange50: createCSSColor([251, 233, 231]),
	deepOrange100: createCSSColor([255, 204, 188]),
	deepOrange200: createCSSColor([255, 171, 145]),
	deepOrange300: createCSSColor([255, 138, 101]),
	deepOrange400: createCSSColor([255, 112, 67]),
	deepOrange500: createCSSColor([255, 87, 34]),
	deepOrange600: createCSSColor([244, 81, 30]),
	deepOrange700: createCSSColor([230, 74, 25]),
	deepOrange800: createCSSColor([216, 67, 21]),
	deepOrange900: createCSSColor([191, 54, 12]),
	deepOrangeA100: createCSSColor([255, 158, 128]),
	deepOrangeA200: createCSSColor([255, 110, 64]),
	deepOrangeA400: createCSSColor([255, 61, 0]),
	deepOrangeA700: createCSSColor([221, 44, 0]),

	brown50: createCSSColor([239, 235, 233]),
	brown100: createCSSColor([215, 204, 200]),
	brown200: createCSSColor([188, 170, 164]),
	brown300: createCSSColor([161, 136, 127]),
	brown400: createCSSColor([141, 110, 99]),
	brown500: createCSSColor([121, 85, 72]),
	brown600: createCSSColor([109, 76, 65]),
	brown700: createCSSColor([93, 64, 55]),
	brown800: createCSSColor([78, 52, 46]),
	brown900: createCSSColor([62, 39, 35]),

	grey50: createCSSColor([250, 250, 250]),
	grey100: createCSSColor([245, 245, 245]),
	grey200: createCSSColor([238, 238, 238]),
	grey300: createCSSColor([224, 224, 224]),
	grey400: createCSSColor([189, 189, 189]),
	grey500: createCSSColor([158, 158, 158]),
	grey600: createCSSColor([117, 117, 117]),
	grey700: createCSSColor([97, 97, 97]),
	grey800: createCSSColor([66, 66, 66]),
	grey900: createCSSColor([33, 33, 33]),

	blueGrey50: createCSSColor([236, 239, 241]),
	blueGrey100: createCSSColor([207, 216, 220]),
	blueGrey200: createCSSColor([176, 190, 197]),
	blueGrey300: createCSSColor([144, 164, 174]),
	blueGrey400: createCSSColor([120, 144, 156]),
	blueGrey500: createCSSColor([96, 125, 139]),
	blueGrey600: createCSSColor([84, 110, 122]),
	blueGrey700: createCSSColor([69, 90, 100]),
	blueGrey800: createCSSColor([55, 71, 79]),
	blueGrey900: createCSSColor([38, 50, 56]),
}
