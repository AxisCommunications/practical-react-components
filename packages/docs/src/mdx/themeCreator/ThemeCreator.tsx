import { useCallback, useMemo, useState, FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { ColorPicker } from './ColorPicker'
import {
  AddIcon,
  CheckIcon,
  CloseIcon,
  DownloadIcon,
  InfoIcon,
  MoreIcon,
} from 'practical-react-components-icons'
import {
  palette,
  Typography,
  getHexValue,
  defaultTheme,
  IconTextButton,
  Button,
  Slider,
  StrengthIndicator,
  Chip,
  DateTimePicker,
  ColorName,
  Paper,
  Theme,
  Color,
  TextBlock,
  TextInput,
  Card,
  CardHeader,
  CardHeaderTypography,
  CardContent,
  CardFooter,
  Menu,
  Progress,
  Spinner,
  IconButton,
  Tooltip,
} from 'practical-react-components-core'
import { H1, P } from '../Base'
import { Code } from '../Code'

const ThemeRow = styled.div`
  border-bottom: ${({ theme }) => theme.color.element11()} 1px solid;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-template-columns: 140px 95px 1fr 60px;
`
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 1%;
`
type SlotColors = Record<keyof Color, ColorName>

const noop = () => {
  /* noop */
}

const TopDocs = () => {
  return (
    <>
      <H1>Theme Creator</H1>
      <P>
        With Theme-Creator you can generate a THEME file with custom colors by
        changing the color of the &apos;slots&apos;.
      </P>
      <P>
        Change a &apos;slot&apos; color by clicking on the color segment and
        choosing a color from the Color-Picker.
      </P>
      <P>When the Preview has the desired look, download the file.</P>
    </>
  )
}

const BottomDocs = () => {
  return (
    <>
      {' '}
      <P>Using the file in your code:</P>
      <Code className="code" type="code">
        {`//App file\n
        import { ThemeProvider } from "styled-components"
        import { myCustomTheme } from "./pathTo<downloadedFile>"\n
        <PracticalProvider>
          <ThemeProvider theme={myCustomTheme}>
            <App />
          </ThemeProvider>
        </PracticalProvider>`}
      </Code>
    </>
  )
}

const generateTheme = (value: SlotColors): Theme => {
  const arrayColors = Object.entries(value).map(([slot, colorName]) => [
    slot,
    palette[colorName],
  ])

  const objectColors = Object.fromEntries(arrayColors)
  const themeValues: Theme = { ...defaultTheme, color: objectColors }

  return themeValues
}

const getSlotColors = (): SlotColors => {
  const namesAsArrays = Object.entries(defaultTheme.color).map(
    ([slot, color]) => {
      const colorName = Object.entries(palette).find(
        ([, colorValue]) => color === colorValue
      )?.[0]
      return [slot, colorName]
    }
  )
  const namesAsObject = Object.fromEntries(namesAsArrays)
  return namesAsObject
}

export const ThemeCreator = () => {
  const [slotColors, setSlotColors] = useState<SlotColors>(getSlotColors)
  const [savedDefaultSlots] = useState<SlotColors>(getSlotColors)
  const previewTheme = useMemo(() => generateTheme(slotColors), [slotColors])

  const reset = useCallback(() => {
    setSlotColors(savedDefaultSlots)
  }, [savedDefaultSlots])

  const triggerDownload = useCallback(() => {
    const customColors = generateThemeFile(slotColors)
    const filename = 'myCustomTheme.js'
    download(filename, customColors)
  }, [slotColors])

  return (
    <>
      <TopDocs />
      <Wrapper>
        <Card>
          <CardHeader style={{ justifyContent: 'space-between' }}>
            <CardHeaderTypography>Color slots</CardHeaderTypography>
            <Tooltip
              verticalAlignment="bottom"
              verticalPosition="top"
              text="Reset colors"
            >
              <IconButton
                icon={CloseIcon}
                variant="secondary"
                onClick={reset}
              />
            </Tooltip>
          </CardHeader>
          <CardContent>
            {(
              Object.entries(slotColors) as ReadonlyArray<
                [keyof Color, ColorName]
              >
            ).map(([slot, colorName]) => (
              <ThemeRow key={slot}>
                <Typography>{slot}</Typography>
                <PaletteColor
                  slot={slot}
                  colorName={colorName}
                  // eslint-disable-next-line react/jsx-no-bind
                  onChange={(slot2, nextColorName) => {
                    setSlotColors(currentValue => ({
                      ...currentValue,
                      [slot2]: nextColorName,
                    }))
                  }}
                />
              </ThemeRow>
            ))}
          </CardContent>
          <CardFooter>
            <Button
              icon={DownloadIcon}
              onClick={triggerDownload}
              label="Download file"
            />
          </CardFooter>
        </Card>
        <PreviewComponents theme={previewTheme} />
      </Wrapper>
      <BottomDocs />
    </>
  )
}

const download = (filename: string, content: string) => {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`
  )
  element.setAttribute('download', filename)
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

interface PaletteColorProps {
  readonly colorName: ColorName
  readonly slot: keyof Color
  readonly onChange: (slot: keyof Color, colorName: ColorName) => void
}

const PaletteColor: FC<PaletteColorProps> = ({ slot, colorName, onChange }) => {
  const handleColorChange = useCallback(
    (nextColorName: ColorName) => {
      onChange(slot, nextColorName)
    },
    [slot, onChange]
  )
  return (
    <>
      <Typography variant="default-text">{colorName}</Typography>
      <ColorPicker onChange={handleColorChange} value={colorName} />
      {colorName !== 'transparent' ? (
        <Typography variant="explanatory-text">
          {getHexValue(palette[colorName]())}
        </Typography>
      ) : (
        <Typography variant="explanatory-text">trans</Typography>
      )}
    </>
  )
}

const generateThemeFile = (value: SlotColors) => {
  const colorsArray = Object.entries(value)
    .map(([slot, colorName]) => `${slot}:palette.${colorName},\n`)
    .join('')

  const fileWithCode = `import { defaultTheme, palette } from 'practical-react-components-core'
  export const myCustomTheme =  {
  ...defaultTheme,
  name: 'customTheme',
  color: {\n${colorsArray}}
}`

  return fileWithCode
}

interface PreviewComponentsProps {
  readonly theme: Theme
}

export const PreviewComponents: FC<PreviewComponentsProps> = ({ theme }) => {
  const [open, setOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date().toISOString())
  const toggle = () => {
    setOpen(!open)
  }
  const save = useCallback((date: string) => {
    setOpen(false)
    setCurrentDate(date)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Card>
        <CardHeader>
          <CardHeaderTypography>Preview</CardHeaderTypography>
        </CardHeader>
        <Paper space={true} square={false}>
          <TextBlock text="DateTimePicker" />
          <Button
            label="Change date and time"
            variant="primary"
            // eslint-disable-next-line react/jsx-no-bind
            onClick={toggle}
          />
          <DateTimePicker
            onSaveAction={{ label: 'Save', onClick: save }}
            onCancelAction={{ label: 'Cancel', onClick: toggle }}
            header="Change date and time"
            date={currentDate}
            open={open}
            hour12={true}
            hour12MeridiemLabels={{ am: 'AM', pm: 'PM' }}
          />
          <TextBlock text="Buttons" />
          <IconTextButton icon={AddIcon} label="label" />
          <Button icon={AddIcon} label="label" />
          <Button icon={AddIcon} variant="secondary" label="label" />
          <TextBlock text="Slider" />
          <Slider value={50} handleChange={noop} />
          <StrengthIndicator strength={0.25} helpText="bad" />
          <StrengthIndicator strength={0.5} helpText="ok" />
          <StrengthIndicator strength={0.75} helpText="good" />
          <StrengthIndicator strength={1} helpText="excellent" />
          <TextBlock text="Chip" />
          <Chip text="good chip" />
          <Chip text="bad chip" error={true} />
          <Chip text="inactive chip" disabled={true} />
          <Chip text="superlong text inside this super chip" />
          <Chip text="with icon" icon={InfoIcon} />
          <Chip text="can be removed" onRemove={noop} />
          <TextBlock text="Text Input" />
          <TextInput
            value=""
            onValueChange={noop}
            placeholder="Placeholder"
            width="large"
          />
          <TextBlock text="Menu" />
          <Menu
            icon={MoreIcon}
            items={[
              { icon: CheckIcon, label: 'Item 1', onClick: noop },
              { label: 'Item 2', onClick: noop, divider: true },
              {
                label: 'Item 3',
                onClick: noop,
                disabled: true,
                danger: true,
              },
            ]}
          />
          <TextBlock text="Progress" />
          <Progress value={0.5} label="50%" />
          <TextBlock text="Spinner" />
          <Spinner type="primary" label="label" />
        </Paper>
      </Card>
    </ThemeProvider>
  )
}
