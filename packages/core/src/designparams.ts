/*
 * Design parameters
 *
 * Parametrize different design properties of the UI components.
 * These are _not_ part of the theme (which only has font/color),
 * as components are built to conform to these properties.
 */

export const spacing = {
	extraSmall: '2px',
	small: '4px',
	medium: '8px',
	large: '16px',
	extraLarge: '24px',
	huge: '32px',
} as const

export const shape = {
	radius: {
		circle: '50%',
		small: '2px',
		medium: '4px',
		large: '8px',
	},
} as const

export const componentSize = {
	mini: '24px',
	small: '32px',
	medium: '40px',
	large: '48px',
	extraLarge: '56px',
} as const

export const iconSize = {
	small: '16px',
	medium: '24px',
	large: '40px',
	extraLarge: '80px',
} as const

export const opacity = {
	16: 0.16,
	24: 0.24,
	40: 0.4,
	48: 0.48,
} as const
