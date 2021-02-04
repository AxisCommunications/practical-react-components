import { SCROLLBAR_DIMENSION } from '../Global/GlobalScrollbarStyle'

const PADDING_LEFT = 24

export const TABLE_DIMENSIONS = {
  DEFAULT_MIN_COLUMN_WIDTH: 64,
  PADDING_LEFT,
  PADDING: PADDING_LEFT + SCROLLBAR_DIMENSION,
  SELECT_WIDTH: 48,
  MENU_WIDTH: 32 + (20 - SCROLLBAR_DIMENSION),

  // TODO: this is componentSize, but that one is a string and contains 'px'
  ROW_HEIGHT: 56,
}
