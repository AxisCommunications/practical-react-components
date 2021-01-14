import React from 'react'

export const range = (length: number) => [...Array(length).keys()]

export const move = (
  arrRange: ReadonlyArray<number>,
  locked: ReadonlyArray<boolean>,
  from: number,
  to: number
) => {
  let p = 0
  return arrRange.map(i => {
    if (locked[i]) {
      return i
    }
    if (i === to) {
      return from
    }
    while (locked[p] || p === from) p++
    return p++
  })
}

export const isElementDisabled = <T>(el: T) =>
  React.isValidElement<{ disabled: boolean }>(el)
    ? el.props.disabled === true
    : false
