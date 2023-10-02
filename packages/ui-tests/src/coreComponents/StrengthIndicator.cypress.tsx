import { StrengthIndicator } from 'practical-react-components-core'

export const meta = {
  name: 'StrengthIndicator',
  route: '/components/strengthindicator',
  menu: '',
}

const Test = () => {
  return (
    <>
      <StrengthIndicator data-cy="worst" helpText="worst" strength={0} />
      <StrengthIndicator data-cy="bad" helpText="bad" strength={0.25} />
      <StrengthIndicator data-cy="ok" helpText="ok" strength={0.5} />
      <StrengthIndicator data-cy="good" helpText="good" strength={0.75} />
      <StrengthIndicator
        data-cy="excellente"
        helpText="excellente"
        strength={1}
      />
    </>
  )
}

export default Test
