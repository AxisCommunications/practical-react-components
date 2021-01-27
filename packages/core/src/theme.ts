import { palette, CSSColor } from './color'

/**
 * Interfaces
 */

type TextTransformType = 'none' | 'uppercase'

export interface IFont {
  readonly size: {
    readonly smaller: string
    readonly small: string
    readonly regular: string
    readonly large: string
    readonly larger: string
  }
  readonly lineHeight: {
    readonly smallest: string
    readonly smaller: string
    readonly small: string
    readonly medium: string
    readonly large: string
    readonly larger: string
  }
  readonly fontWeight: {
    readonly normal: number
    readonly semibold: number
    readonly bold: number
  }
  readonly family: string
  readonly button: {
    readonly primary: {
      readonly textTransform: TextTransformType
    }
    readonly secondary: {
      readonly default: {
        readonly textTransform: TextTransformType
      }
      readonly accent: {
        readonly textTransform: TextTransformType
      }
    }
  }
  readonly tableHeader: {
    readonly textTransform: TextTransformType
  }
}

export interface IColor {
  readonly text00: CSSColor
  readonly text01: CSSColor
  readonly text02: CSSColor
  readonly text03: CSSColor
  readonly text04: CSSColor
  readonly text05: CSSColor
  readonly text06: CSSColor
  readonly textLink: CSSColor
  readonly textLinkHover: CSSColor
  readonly textPrimary: CSSColor
  readonly textError: CSSColor
  readonly background: CSSColor
  readonly background00: CSSColor
  readonly background01: CSSColor
  readonly background02: CSSColor
  readonly background03: CSSColor
  readonly background04: CSSColor
  readonly background05: CSSColor
  readonly backgroundPrimary: CSSColor
  readonly backgroundError: CSSColor
  readonly element01: CSSColor
  readonly element10: CSSColor
  readonly element11: CSSColor
  readonly element12: CSSColor
  readonly element13: CSSColor
  readonly element14: CSSColor
  readonly element15: CSSColor
  readonly element16: CSSColor
  readonly elementPrimary: CSSColor
  readonly elementHalfPrimary: CSSColor
  readonly elementError: CSSColor
  readonly elementSuccess: CSSColor
  readonly elementWarning: CSSColor
  readonly elementAccent: CSSColor
  readonly elementBorder: CSSColor
}

export interface IShadow {
  readonly card: string
  readonly dialog: string
  readonly dialogHeaderFooter: string
  readonly header: string
  readonly knobOff1: string
  readonly knobOff2: string
  readonly knobOn1: string
  readonly knobOn2: string
  readonly knobOn3: string
  readonly menu: string
  readonly primaryButton: string
  readonly selectList: string
  readonly tab: string
  readonly tableRow: string
  readonly toast: string
  readonly tooltip: string
}

export type ISelectMarker = 'background' | 'check'

export interface ITheme {
  readonly font: IFont
  readonly color: IColor
  readonly shadow: IShadow
  readonly compact: boolean
  readonly selectMarker: ISelectMarker
}

/**
 * Default theming
 */
export const font: IFont = {
  size: {
    smaller: '11px',
    small: '12px',
    regular: '13px',
    large: '14px',
    larger: '21px',
  },
  lineHeight: {
    smallest: '15px',
    smaller: '17px',
    small: '18px',
    medium: '21px',
    large: '22px',
    larger: '32px',
  },
  fontWeight: {
    normal: 400,
    semibold: 600,
    bold: 700,
  },
  family: 'Open Sans, Helvetica, arial, sans-serif',
  button: {
    primary: {
      textTransform: 'none',
    },
    secondary: {
      default: {
        textTransform: 'none',
      },
      accent: {
        textTransform: 'none',
      },
    },
  },
  tableHeader: {
    textTransform: 'none',
  },
}

export const defaultTheme: ITheme = {
  font,
  color: {
    text00: palette.white,
    text01: palette.grey16,
    text02: palette.grey24,
    text03: palette.grey32,
    text04: palette.grey40,
    text05: palette.grey48,
    text06: palette.grey16,
    textLink: palette.deepPurple600,
    textLinkHover: palette.deepPurple700,
    textPrimary: palette.deepPurple800,
    textError: palette.red700,
    background: palette.white,
    background00: palette.white,
    background01: palette.grey94,
    background02: palette.grey96,
    background03: palette.grey98,
    background04: palette.grey98,
    background05: palette.white,
    backgroundPrimary: palette.grey96,
    backgroundError: palette.red50,
    element01: palette.grey40,
    element10: palette.grey98,
    element11: palette.grey80,
    element12: palette.grey90,
    element13: palette.grey72,
    element14: palette.grey64,
    element15: palette.grey98,
    element16: palette.grey98,
    elementPrimary: palette.deepPurple500,
    elementHalfPrimary: palette.deepPurple600,
    elementError: palette.red700,
    elementSuccess: palette.green700,
    elementWarning: palette.amber500,
    elementAccent: palette.deepPurple500,
    elementBorder: palette.transparent,
  },
  shadow: {
    card: '0 2px 6px 0 rgba(235, 237, 240, 1)',
    dialog: '0 2px 12px 0 rgba(0, 0, 0, 0.24)',
    dialogHeaderFooter: '0 0 4px 2px rgba(0, 0, 0, 0.08)',
    header: '0px 2px 6px rgba(0, 0, 0, 0.16)',
    knobOff1: '0 1px 4px 0 rgba(0, 0, 0, 0.24)',
    knobOff2: '0 1px 2px 0 rgba(0, 0, 0, 0.32)',
    knobOn1: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
    knobOn2: '0 1px 2px 0 rgba(0, 0, 0, 0.24)',
    knobOn3: '0 1px 1px 0 rgba(0, 0, 0, 0.24)',
    menu: '0 2px 16px 0px rgba(0, 0, 0, 0.24)',
    primaryButton: '0 2px 6px 0 rgba(0, 0, 0, 0.16)',
    selectList: '0 2px 4px 0 rgba(0, 0, 0, 0.24)',
    tab: '0 2px 6px 0 rgba(188, 195, 204, 0.32)',
    tableRow: '0 1px 4px 0 rgba(0, 0, 0, 0.16)',
    toast: '0 4px 24px 0 rgba(0, 0, 0, 0.08)',
    tooltip: '0 4px 24px 0 rgba(0, 0, 0, 0.08)',
  },
  compact: false,
  selectMarker: 'background',
}
