# Development

Package management requires latest (stable) versions of yarn and node.

## Components

The React components are kept in one folder per component, containing an
`index.tsx` file. The former contains the actual component implementation, while
the latter documents and showcases the component, where you can see and interact
with the component.

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
