import styled, { css } from 'styled-components'

export type TypographyVariant =
  | 'chip-tag-text'
  | 'explanatory-text'
  | 'caption'
  | 'navigation-group'
  | 'navigation-label'
  | 'card-title'
  | 'group-title'
  | 'column-heading'
  | 'header-title'
  | 'default-text'
  | 'dialog-heading'
  | 'page-heading'
  | 'button-text'
  | 'compact-label'

const TYPOGRAPHY_VARIANTS = {
  /**
   * Paragraph
   *
   * The sort of text that appears in blocks inside
   * e.g. a modal, should be easily readable.
   */
  'default-text': {
    as: 'p',
    css: css`
      font-size: ${({ theme }) => theme.font.size.regular};
      line-height: ${({ theme }) => theme.font.lineHeight.large};
    `,
  },

  /**
   * Descriptive
   *
   * The sort of text that elaborates on another
   * piece of information or context.
   * Should be small to be able to show a lot.
   */
  caption: {
    as: 'p',
    css: css`
      font-size: ${({ theme }) => theme.font.size.small};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
    `,
  },

  /**
   * Dialog heading
   */
  'dialog-heading': {
    as: 'p',
    css: css`
      font-size: ${({ theme }) => theme.font.size.larger};
      line-height: ${({ theme }) => theme.font.lineHeight.larger};
    `,
  },

  /**
   * Page heading
   */
  'page-heading': {
    as: 'p',
    css: css`
      font-size: ${({ theme }) => theme.font.size.larger};
      line-height: ${({ theme }) => theme.font.lineHeight.larger};
    `,
  },

  /**
   * Chip or tag text
   *
   * Text appearing as chip or tag.
   * Should be small text.
   */
  'chip-tag-text': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.small};
      line-height: ${({ theme }) => theme.font.lineHeight.smaller};
      white-space: nowrap;
    `,
  },

  /**
   * Explanatory text
   *
   * Text appearing as explanatory text, e.g. error message in a field.
   * Should be small text.
   */
  'explanatory-text': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.small};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
      white-space: nowrap;
    `,
  },

  /**
   * Navigation group
   *
   * Text appearing as navigation group name, e.g. Group name on sidebar.
   */
  'navigation-group': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.small};
      line-height: ${({ theme }) => theme.font.lineHeight.smaller};
      white-space: nowrap;
    `,
  },

  /**
   * Navigation label
   *
   * Standard size used for text labels,
   * short descriptions connected to another element.
   * e.g. Label on sidebar
   */
  'navigation-label': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.regular};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
      white-space: nowrap;
    `,
  },

  /**
   * Card title
   */
  'card-title': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.regular};
      font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
      white-space: nowrap;
    `,
  },

  /**
   * Group title
   *
   * Text appearing as a title of some fields or some group in Dialog.
   */
  'group-title': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.regular};
      font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
      white-space: nowrap;
    `,
  },

  /**
   * Column heading in a table
   */
  'column-heading': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.small};
      font-weight: ${({ theme }) => theme.font.fontWeight.normal};
      line-height: ${({ theme }) => theme.font.lineHeight.smaller};
      white-space: nowrap;
    `,
  },

  /**
   * Header title
   */
  'header-title': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.regular};
      font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
      line-height: ${({ theme }) => theme.font.lineHeight.small};
      white-space: nowrap;
    `,
  },

  /**
   * Button
   *
   * Text appearing inside a button
   */
  'button-text': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.large};
      font-weight: ${({ theme }) => theme.font.fontWeight.semibold};
      line-height: ${({ theme }) => theme.font.lineHeight.large};
      white-space: nowrap;
    `,
  },

  /**
   * Compact label
   *
   * Label where space is limited
   */
  'compact-label': {
    as: 'span',
    css: css`
      font-size: ${({ theme }) => theme.font.size.smaller};
      line-height: ${({ theme }) => theme.font.lineHeight.smallest};
    `,
  },
}

/**
 *
 * Generic typography
 *
 */

export interface TypographyProps {
  readonly variant?: TypographyVariant
}

export const Typography = styled.p.attrs<TypographyProps>(
  ({ variant = 'default-text' }) => ({
    as: TYPOGRAPHY_VARIANTS[variant].as,
  })
)<TypographyProps>`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ theme }) => theme.font.size.regular};
  line-height: ${({ theme }) => theme.font.lineHeight.large};
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;

  ${({ variant = 'default-text' }) => TYPOGRAPHY_VARIANTS[variant].css}
`
