/**
 * This file is for internal theme use only!
 * It must not be used elsewhere.
 */

/**
 * Theme definitions for styled components
 */
type RGB = ReadonlyArray<number>

/**
 * Create a color that is a shade of grey
 * @param brightness The level of white in grey (0 = black, 100 = white)
 */
const grey = (brightness = 100): RGB => {
  const l = Math.round(Math.max(0, Math.min((brightness / 100) * 255, 255)))
  return [l, l, l]
}

/**
 * Convenience wrappers for allowing any color to
 * have an alpha channel.
 */
export type CSSColor = (a?: number) => string

const createCSSColor = ([r, g, b]: RGB): CSSColor => (a?: number) =>
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
