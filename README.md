# Practical react components

A catalogue of React components, focused on ease-of-use.

To install the core package, run:

```shell
yarn add practical-react-components-core
```

This contains all the core components. All the icons are located in a separate
`practical-react-components-icons` package.

### Dependencies

Practical react components is dependent on some packages, in addition to `react`
and `react-dom`, that needs to be installed for it to work. Make sure the
following packages are installed:

```shell
yarn add styled-components
yarn add react-transition-group
yarn add pepjs
```

If you are using `practical-react-components-formik` you also need to make sure
the following packages are installed:

```shell
yarn add formik
```

### Typescript (only if using typescript)

Install additional typings:

```shell
yarn add @types/styled-components
```

If you use Typescript and want to use `styled-components`, you need to add a
file to your source directory, e.g.:

```shell
styled-components.d.ts
```

with the following contents:

```typescript
import 'styled-components'
import { ITheme } from './theme'

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
```

in which case you should get proper typings for the `theme` prop in your own
styled components.

Make sure this file is included in your `tsconfig.json` files, e.g.
`"include": ["src/styled-components.d.ts", "./src/index.ts"]`.

### Electron (only if using electron)

If you are using Practical react components with an Electron app you might have
to add the following lines in the root of you `package.json` file.

```json
"electronWebpack": {
  "whiteListedModules": [
    "practical-react-components-core",
    "styled-components"
  ]
}
```

## Usage

Practical react components makes use of contexts to provide theme and toast
creators. To make it possible to use the components, you need to wrap your app
in a `PracticalProvider`.

On the provider you can optionally specify a theme and behaviors for toasts.

```typescript
export const Entry: React.FC = () => {
  return (
    <PracticalProvider>
      <App />
    </PracticalProvider>
  )
}
```

In your app, you can then start using Practical react components:

```typescript
export const App: React.FC = () => {
  const [text, setText] = useState()
  const { showSuccessToast } = useToasts()

  return (
    <AppContainer>
      <TextInput onValueChange={setText} />
      <SpaceBlock variant={16} />
      <Button
        label="Yay"
        onClick={() => showSuccessToast({ label: `You wrote: ${text}` })}
      />
    </AppContainer>
  )
}
```

For more information on what components are available and how to use them
please visit the [documentation](https://github.com/AxisCommunications/practical-react-components).

## Components

The React components are kept in one folder per component, containing an
`index.tsx` and `index.mdx` file. The former contains the actual component
implementation, while the latter documents and showcases the component, where
you can see and interact with the component.

To create a new component:

- create a folder with the component name
- add an `index.tsx` file which exports the component and any other
  related components and/or utilities (types, hooks, etc...). Do _not_
  create any default exports

## Icons

To add new icons to the library, put the SVG-file into the `packages/icons/src`
folder and execute `yarn build:icons`. The command re-generates `tsx` files for
all SVGs in the `packages/icons/src/__generated__` together with a barrel-file
to export them all. The name of the generated icon is Pascal-cased and
post-fixed with `Icon`. Note that some `fill` and `stroke` colors might have to
be removed or replaced in the original SVG with the value `currentColor` in
order for the theming to work properly.

### How to optimize svg

1. Make sure that the svg file has only **one** path between `<svg>` tag and that its viewBox is `24px` box.

An example:

```
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M17 13h-4v4a1 1 0 01-2 0v-4H7a1 1 0 010-2h4V7a1 1 0 012 0v4h4a1 1 0 010 2z" />
</svg>
```

2. If it satisfies **1**, go to **10**.
   If not, you should optimize the file with all following steps.
3. Remove extra tag or unnecessary styles/attributes in [SVGOMG - SVGO's Missing GUI](https://jakearchibald.github.io/svgomg/).
4. Open the file in [Inkscape](https://inkscape.org/).
5. Ungroup the paths if they are grouped.
6. Remove extra path and rect.
7. Change stroke to path. (Select the element + F2)
8. Select all paths and combine all paths. (Combine or Union)
9. Export it as optimized svg.
10. Copy the code and paste it on input in [Playground - SVGR](https://react-svgr.com/playground/).
11. Copy the `<path>` on the output and replace with the original `<path>`.
12. Run `yarn build:icons` and check the icon on docs.

## Performance - best practices

### General memoization

[Link to React Docs](https://reactjs.org/docs/react-api.html#reactmemo)

_If your function component renders the same result given the same props, you
can wrap it in a call to React.memo for a performance boost in some cases by
memoizing the result. This means that React will skip rendering the component,
and reuse the last rendered result._

**Caveat: Mounting the component in the DOM takes longer, thus this method is
not always an good idea. Use where the component might re-render alot due
changes in parent, etc.**

### Styled-components - What to know

1. `Styled-components` are heavy, they take quite some time to mount.
2. When performance is slow due to large number of components & DOM elements,
   create custom, light and fast, sub components adapted for their intended
   context of use. (i.e not having unused logic/code in it)
3. The best component is the non-existing. Can the contents be mounted inside
   another already existing component?

### CSS

[CSS/JS - Performance 101](https://www.viget.com/articles/animation-performance-101-browser-under-the-hood/)

CSS is fast, animating anything but `opacity` & `transform` is slow.

Replacing `.svg` with pure CSS is faster.

## Release

Instructions on how to do a new release for the main branch.

1. Make sure you have permissions to push to main
2. Get latest main
   ```shell
   git checkout main
   git pull --ff-only upstream main
   ```
3. Get all tags
   ```shell
   git fetch --all --tags
   ```
4. Create a new version commit
   ```shell
   yarn release [increment]
   ```
   where `increment` is a semver specification of the increment you want
   for the release (`prerelease` is used if nothing is specified).
5. Check the commit of the newly generated tag and make sure only the changes
   between latest tag and this one are included in the CHANGELOG.md file.
6. Push new version to main
   ```shell
   git push upstream main <new_tag>
   ```
7. Copy changes from CHANGELOG.md file, add them for your tag on **tags**
   page and make sure that changes are displayed on the **releases** page.
8. Done
