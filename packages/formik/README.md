# Practical react components formik

A catalogue of React components that are wrapped by [formik](https://formik.org/), focused on ease-of-use.

To install the formik package, run:

```shell
yarn add practical-react-components-formik
```

This contains all the formik components.

## Dependencies

Practical react components formik is dependent on some packages, in addition to `react`
and `react-dom`, that need to be installed for it to work. Make sure the
following packages are installed:

```shell
yarn add styled-components
yarn add react-transition-group
yarn add pepjs
yarn add formik
```

## Usage

```typescript
import { useFormik, FormikProvider } from 'formik'
import { FormikTextInputField } from 'practical-react-components-formik'

const formik = useFormik({
  initialValues,
  validationSchema,
  onSubmit,
})

return (
  <FormikProvider value={formik}>
    <FormikTextInputField
      label="component-label"
      name="component-name"
      onBlur={formik.submitForm}
    />
  </FormikProvider>
)
```

For more information and example see [documentation](https://axiscommunications.github.io/practical-react-components/#formik) and [formik documentation](https://formik.org/).
