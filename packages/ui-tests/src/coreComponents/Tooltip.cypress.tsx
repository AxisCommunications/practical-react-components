import React from 'react'
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
  grid-template-columns: auto 1fr;
  max-width: 400px;
  grid-gap: 16px;
`

const BottomWrapper = styled(TopWrapper)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const Test = () => {
  return (
    <>
      <TopWrapper>
        <Tooltip text="Tooltip top" data-cy="defaultTooltipTop">
          <Typography variant="default-text" data-cy="defaultTooltipTopText">
            Default top
          </Typography>
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
          <Typography variant="default-text" data-cy="expandedTooltipTopText">
            Expanded top
          </Typography>
        </Tooltip>
      </TopWrapper>
      <BottomWrapper>
        <Tooltip text="Tooltip bottom" data-cy="defaultTooltipBottom">
          <Typography variant="default-text" data-cy="defaultTooltipBottomText">
            Default bottom
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
          <Typography
            variant="default-text"
            data-cy="expandedTooltipBottomText"
          >
            Expanded bottom
          </Typography>
        </Tooltip>
      </BottomWrapper>
    </>
  )
}

/* eslint-disable-next-line import/no-default-export */
export default Test
