import React, { useContext } from 'react'
import { appSetStateContext } from '../AppState'
import { RobotProps } from './Robot'

export const withAddToCart = (ChildComponent: React.ComponentType<RobotProps>) => {
  // return class extends React.Component {}
  return (props) => {
    const setState = useContext(appSetStateContext)
    const addToCart = (id, name) => {
      // 思考怎么用自定义 hook 处理
      if (setState) {
        setState((state) => {
          return {
            ...state,
            shoppingCart: {
              items: [...state.shoppingCart.items, { id, name }]
            }
          }
        })
      }
    }
    return <ChildComponent {...props} addToCart={addToCart} />
  }
}
