import React from 'react'
import { StyleSheet } from 'react-native'

interface Props {
  style?: any,
  children?: any,
  rest?: any
}

const styled = (Component: any) => {
  const comp = (styles: any) => {
    return ({ style, children, ...rest }: Props) => {
      let composed: any[] = []
      if (styles) {
        composed = [
          ...composed,
          StyleSheet.create({
            styles
          }).styles
        ]
      }

      if (Array.isArray(style)) {
        composed = [...composed, ...style]
      } else if (style) {
        composed = [
          ...composed,
          StyleSheet.create({
            style
          }).style
        ]
      }

      return <Component {...{ style: composed }} {...rest}>{children}</Component>
    }
  }

  return (arg: () => any) => {
    if (typeof arg === 'function') {
      return comp(arg())
    }

    return comp((arg))
  }
}

export default styled