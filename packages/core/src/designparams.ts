/*
 * Design parameters
 *
 * Parametrize different design properties of the UI components.
 * These are _not_ part of the theme (which only has font/color),
 * as components are built to conform to these properties.
 */

interface Spacing {
  readonly extraSmall: '2px'
  readonly small: '4px'
  readonly medium: '8px'
  readonly large: '16px'
  readonly extraLarge: '24px'
  readonly huge: '32px'
}
/**
 * Spacing
 * @extraSmall '2px',
 * @small '4px',
 * @medium '8px',
 * @large '16px',
 * @extraLarge '24px',
 * @huge '32px',
 */
export const spacing: Spacing = {
  extraSmall: '2px',
  small: '4px',
  medium: '8px',
  large: '16px',
  extraLarge: '24px',
  huge: '32px',
}

interface Radius {
  readonly circle: '50%'
  readonly small: '2px'
  readonly medium: '4px'
  readonly large: '8px'
}
interface Shape {
  readonly radius: Radius
}
/**
 * Basic shapes
 */
export const shape: Shape = {
  radius: {
    circle: '50%',
    small: '2px',
    medium: '4px',
    large: '8px',
  },
}

interface ComponentSize {
  readonly mini: '24px'
  readonly small: '32px'
  readonly medium: '40px'
  readonly large: '48px'
  readonly extraLarge: '56px'
}
/**
 * Component size
 * @mini '24px',
 * @small '32px',
 * @medium '40px',
 * @large '48px',
 * @extraLarge '56px',
 */
export const componentSize: ComponentSize = {
  mini: '24px',
  small: '32px',
  medium: '40px',
  large: '48px',
  extraLarge: '56px',
}

interface Iconsize {
  readonly small: '16px'
  readonly medium: '24px'
  readonly large: '40px'
  readonly extraLarge: '80px'
}
/**
 * Icon size
 * @small '16px',
 * @medium '24px',
 * @large '40px',
 * @extraLarge '80px',
 */
export const iconSize: Iconsize = {
  small: '16px',
  medium: '24px',
  large: '40px',
  extraLarge: '80px',
}

interface Opacity {
  readonly 16: 0.16
  readonly 24: 0.24
  readonly 40: 0.4
  readonly 48: 0.48
}
/**
 * Opacities
 */
export const opacity: Opacity = {
  16: 0.16,
  24: 0.24,
  40: 0.4,
  48: 0.48,
}
