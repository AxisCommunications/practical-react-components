import styled from 'styled-components'

import {
  Tooltip,
  Typography,
  ExpandedTooltipTypography,
} from 'practical-react-components-core'

export const meta = {
  name: 'Tooltip',
  route: '/components/Tooltip',
  menu: '',
}

const TopWrapper = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 16px;
`

const BottomWrapper = styled(TopWrapper)`
  position: absolute;
  bottom: 8px;
  right: 8px;
`

const Test = () => {
  return (
    <>
      <TopWrapper>
        <Tooltip text="Tooltip top - default" data-cy="defaultTooltipTop">
          <Typography data-cy="defaultTooltipTopText">Default top</Typography>
        </Tooltip>
        <Tooltip
          tipTitle="Tooltip titile"
          contents={
            <ExpandedTooltipTypography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum consequat ante pulvinar ligula fermentum, sit amet
              maximus sapien iaculis.
            </ExpandedTooltipTypography>
          }
          variant="expanded"
          data-cy="expandedTooltipTop"
        >
          <Typography data-cy="expandedTooltipTopText">Expanded top</Typography>
        </Tooltip>
        <Tooltip
          tipTitle="Tooltip titile"
          contents={
            <ExpandedTooltipTypography>
              LeftRight Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum consequat ante pulvinar ligula fermentum, sit amet
              maximus sapien iaculis.
            </ExpandedTooltipTypography>
          }
          variant="expanded"
          placement="left-right"
          data-cy="expandedTooltipTopLeftRight"
        >
          <Typography data-cy="expandedTooltipTopLeftRightText">
            Expanded top(left-right)
          </Typography>
        </Tooltip>
      </TopWrapper>
      <BottomWrapper>
        <Tooltip text="Tooltip bottom - default" data-cy="defaultTooltipBottom">
          <Typography data-cy="defaultTooltipBottomText">
            Default bottom
          </Typography>
        </Tooltip>
        <Tooltip
          tipTitle="Tooltip titile"
          contents={
            <ExpandedTooltipTypography>
              LeftRight Nulla rutrum pulvinar urna, sed aliquet tortor pharetra
              id. Sed mattis augue ut libero volutpat, quis rhoncus nibh
              lacinia.
            </ExpandedTooltipTypography>
          }
          variant="expanded"
          placement="left-right"
          data-cy="expandedTooltipBottomLeftRight"
        >
          <Typography data-cy="expandedTooltipBottomLeftRightText">
            Expanded bottom(left-right)
          </Typography>
        </Tooltip>
        <Tooltip
          tipTitle="Tooltip titile"
          contents={
            <ExpandedTooltipTypography>
              Nulla rutrum pulvinar urna, sed aliquet tortor pharetra id. Sed
              mattis augue ut libero volutpat, quis rhoncus nibh lacinia.
            </ExpandedTooltipTypography>
          }
          variant="expanded"
          data-cy="expandedTooltipBottom"
        >
          <Typography data-cy="expandedTooltipBottomText">
            Expanded bottom
          </Typography>
        </Tooltip>
      </BottomWrapper>
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
