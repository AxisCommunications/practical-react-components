import React from 'react'
import styled from 'styled-components'
import { useFormik, FormikProvider } from 'formik'
import {
  Typography,
  spacing,
  SpaceBlock,
} from 'practical-react-components-core'

const Pre = styled(Typography).attrs({
  variant: 'default-text',
})`
  font-family: monospace;
  line-height: 1.2;
  white-space: pre;
`

const Container = styled.div`
  display: grid;
  grid-gap: ${spacing.large};
  grid-template-columns: repeat(2, minmax(200px, 400px));
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormikDemo: React.FC<{ readonly initialValues: any }> = ({
  initialValues,
  children,
}) => {
  const formik = useFormik({
    initialValues,
    onSubmit: v => alert(v),
  })

  return (
    <FormikProvider value={formik}>
      <Container>
        <Block>
          <Typography variant="group-title">Component</Typography>
          <SpaceBlock variant={8} />
          {children}
        </Block>
        <Block>
          <Typography variant="group-title">Formik state</Typography>
          <SpaceBlock variant={8} />
          <Pre>{JSON.stringify(formik, null, 2)}</Pre>
        </Block>
      </Container>
    </FormikProvider>
  )
}
