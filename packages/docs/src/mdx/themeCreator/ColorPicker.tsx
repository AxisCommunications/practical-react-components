import React, { useCallback, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  palette,
  Tooltip,
  shape,
  ColorName,
  CSSColor,
  spacing,
  componentSize,
  PopOver,
} from 'practical-react-components-core'
import { useClickOutside } from 'react-hooks-shareable'

const PALETTE_CONTAINER_HEIGHT = 300

interface ColorBoxProps {
  readonly color?: string
  readonly selected: boolean
}
const ColorBox = styled.div<ColorBoxProps>`
  background-color: ${({ color }) => color};
  cursor: pointer;
  height: ${componentSize.small};
  width: ${componentSize.small};
  ${({ selected }) =>
    selected
      ? `height: ${componentSize.mini};
  width: ${componentSize.mini};
  margin:2px`
      : '0px'};
`
const SelectedColorBox = styled.div<ColorBoxProps>`
  ${({ selected }) => (selected ? `border:2px solid;` : 'none')};
`

const ColorSegment = styled.div`
  background-color: ${({ color }) => color};
  cursor: pointer;
  height: 20px;
  border-radius: ${shape.radius.medium};
  margin: 0 ${spacing.medium};
`
interface PaletteContainerProps {
  readonly changeWidth?: number
}

const PaletteContainer = styled.div<PaletteContainerProps>`
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.color.background()};
  border: ${({ theme }) => theme.color.element13()} 2px solid;
  border-radius: ${shape.radius.medium};
  height: ${PALETTE_CONTAINER_HEIGHT}px;
  display: flex;
  flex-wrap: wrap;
  width: ${({ changeWidth }) => changeWidth}px;
  min-width: 115px;
`
interface PaletteColorProps {
  readonly colorName: ColorName
  readonly colorValue: CSSColor
  readonly onChosenColor: (colorName: ColorName) => void
  readonly selected: boolean
}

const PaletteColor: React.VFC<PaletteColorProps> = ({
  colorName,
  colorValue,
  onChosenColor,
  selected,
}) => {
  const onClick = useCallback(() => {
    onChosenColor(colorName)
  }, [colorName, onChosenColor])
  return (
    <div key={colorName}>
      <Tooltip text={colorName}>
        <SelectedColorBox selected={selected}>
          <ColorBox
            selected={selected}
            color={colorValue()}
            onClick={onClick}
          />
        </SelectedColorBox>
      </Tooltip>
    </div>
  )
}

export interface ColorPickerProps {
  readonly onChange: (value: ColorName) => void
  readonly value: ColorName
}

export const ColorPicker: React.VFC<ColorPickerProps> = ({
  onChange,
  value,
}) => {
  const [directionUp, setDirectionUp] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const checkWidth = useRef<HTMLDivElement | null>(null)
  const currentWidth = checkWidth.current?.clientWidth
  const colorSegment = useMemo(() => palette[value](), [value])

  const checkDirection = useCallback(() => {
    const { clientHeight } = document.documentElement
    const elem = anchorEl?.getBoundingClientRect()
    if (elem) {
      const diff = Math.floor(clientHeight - elem.bottom)

      // 300px is the height of <PaletteContainer>
      if (diff < PALETTE_CONTAINER_HEIGHT) setDirectionUp(true)
    }
  }, [anchorEl])

  const toggle = useCallback(() => {
    setOpen(o => !o)
    checkDirection()
  }, [checkDirection])

  const handler = useClickOutside(() => {
    setOpen(false)
  })

  const removePopOver = useCallback(() => {
    setOpen(o => !o)
  }, [])

  return (
    <>
      <div ref={setAnchorEl}>
        <ColorSegment
          color={colorSegment}
          onClick={toggle}
          onPointerDown={handler}
          ref={checkWidth}
        >
          {open ? (
            <PopOver
              horizontalAlignment="center"
              horizontalPosition="center"
              verticalAlignment={directionUp ? 'bottom' : 'top'}
              verticalPosition={directionUp ? 'top' : 'bottom'}
              anchorEl={anchorEl}
              onScroll={removePopOver}
            >
              <PaletteContainer changeWidth={currentWidth}>
                {(
                  Object.entries(palette) as ReadonlyArray<
                    [ColorName, CSSColor]
                  >
                )
                  // Filter out transparent "color"
                  .filter(([colorName]) => colorName !== 'transparent')
                  .map(([colorName, colorValue]) => (
                    <PaletteColor
                      key={colorName}
                      selected={value === colorName}
                      colorValue={colorValue}
                      onChosenColor={onChange}
                      colorName={colorName}
                    />
                  ))}
              </PaletteContainer>
            </PopOver>
          ) : null}
        </ColorSegment>
      </div>
    </>
  )
}
