import React, { useState, useCallback, useRef } from 'react'
import styled, { css } from 'styled-components'
import { DropIcon } from 'practical-react-components-icons'

import { font } from '../theme'
import { spacing, shape } from '../designparams'
import { Typography } from '../Typography'
import { Icon } from '../Icon'

type BaseElement = HTMLInputElement
type BaseProps = React.InputHTMLAttributes<BaseElement>
type InputChangeHandler = React.ChangeEventHandler<BaseElement>

const DroppableIcon = styled(Icon)`
  align-self: center;
  display: block;
  color: ${({ theme }) => theme.color.text00()};
  background-color: ${({ theme }) => theme.color.elementPrimary()};
  padding: ${spacing.small};
  border-radius: ${shape.radius.small};
  margin-bottom: ${spacing.medium};
`

const DroppableArea = styled.div<{ readonly isDragging: boolean }>`
  ${({ isDragging }) =>
    isDragging
      ? css`
          background-color: ${({ theme }) => theme.color.background02()};
        `
      : undefined}
  border: 1px dashed ${({ theme }) => theme.color.text02()};
  display: flex;
  flex-direction: column;
  font-size: ${font.size.small};
  justify-content: center;
  text-align: center;
  padding: ${spacing.large} ${spacing.extraLarge};
  cursor: pointer;
`

const DroppableInputFile = styled.input`
  display: none;
`

const DroppableLabel = styled.div`
  display: grid;
  grid-gap: ${spacing.small};
  grid-template-columns: auto auto;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: ${({ theme }) => theme.color.text01()};
`

const InputLabel = styled(Typography)`
  white-space: initial;
  word-wrap: break-word;
`

interface DroppableProps extends BaseProps {
  /**
   * `class` to be passed to the component.
   */
  readonly className?: BaseProps['className']
  /**
   * Text that is shown inside the component.
   */
  readonly inputLabel: string
  /**
   * A function which is run when the file is selected.
   */
  readonly onFileChange?: (file?: File) => void
  /**
   * Text which can be used to inform user about supported formats.
   */
  readonly supportedFormats?: string
  /**
   * Name of the selected file
   */
  readonly selectedFileName?: string
}

let enterTarget: EventTarget | undefined

export const Droppable: React.FC<DroppableProps> = ({
  onFileChange,
  inputLabel,
  supportedFormats,
  selectedFileName,
  className,
  onChange,
  ...props
}) => {
  const [isDragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const handleLinkClick = useCallback(() => fileRef.current?.click(), [fileRef])
  const handleFile = useCallback(
    (files: ReadonlyArray<File> | null) => {
      if (files === null) {
        return
      }

      onFileChange?.(files[0])

      if (fileRef.current !== null) {
        fileRef.current.value = ''
      }
    },
    [fileRef, onFileChange]
  )
  const handleDragAndDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()

      if (event.type === 'dragenter') {
        enterTarget = event.target
        setDragging(true)
      }

      if (event.type === 'dragleave' && enterTarget === event.target) {
        event.stopPropagation()
        setDragging(false)
      }

      if (event.type === 'drop') {
        enterTarget = undefined

        handleFile([...event.dataTransfer.files])
        setDragging(false)
      }
    },
    [handleFile]
  )
  const handleFileChange = useCallback<InputChangeHandler>(
    e => {
      onChange?.(e)
      handleFile(e.target.files !== null ? [...e.target.files] : null)
    },
    [handleFile, onChange]
  )

  const hasSelectedFile = selectedFileName !== undefined

  return (
    <DroppableArea
      isDragging={isDragging}
      draggable={false}
      onDragEnter={handleDragAndDrop}
      onDragLeave={handleDragAndDrop}
      onDragOver={handleDragAndDrop}
      onDrop={handleDragAndDrop}
      onClick={handleLinkClick}
      className={className}
    >
      <DroppableIcon icon={DropIcon} />
      <DroppableInputFile
        ref={fileRef}
        type="file"
        multiple={false}
        onChange={handleFileChange}
        {...props}
      />
      <DroppableLabel>
        <InputLabel variant={hasSelectedFile ? 'caption' : 'group-title'}>
          {inputLabel}
        </InputLabel>
      </DroppableLabel>

      {supportedFormats !== undefined && !hasSelectedFile ? (
        <Typography variant="caption">{supportedFormats}</Typography>
      ) : null}

      {selectedFileName !== undefined ? (
        <Typography variant={!hasSelectedFile ? 'group-title' : 'caption'}>
          {selectedFileName}
        </Typography>
      ) : null}
    </DroppableArea>
  )
}
