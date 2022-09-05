import React, { useState } from 'react'

interface AppStateValue {
  username: string
  shoppingCart: { items: { id: number; name: string }[] }
}

const defaultContextValue: AppStateValue = {
  username: 'leeco',
  shoppingCart: { items: [] }
}
export const appContext = React.createContext(defaultContextValue)
// 初始化函数，传 undefined
export const appSetStateContext = React.createContext<
  React.Dispatch<React.SetStateAction<AppStateValue>> | undefined
>(undefined)

export const AppStateProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [state, setState] = useState(defaultContextValue)

  return (
    <appContext.Provider value={state}>
      <appSetStateContext.Provider value={setState}>{props.children}</appSetStateContext.Provider>
    </appContext.Provider>
  )
}
