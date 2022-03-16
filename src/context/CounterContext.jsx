import { createContext, useReducer } from 'react'
import { INCREMENT, DECREMENT, RESETCOUNT } from './actions'
import { countReducer } from './countReducer'

// create a context
export const CounterContext = createContext()

//crate a provider

export const CountProvider = ({ children }) => {
  const [count, dispatch] = useReducer(countReducer, 0)

  const incrementCount = () => {
    // setCount((count) => count + 1)
    dispatch({ type: INCREMENT, payload: 1 })
  }

  const decrementCount = () => {
    dispatch({ type: DECREMENT, payload: 1 })
  }

  const resetCount = () => {
    dispatch({ type: RESETCOUNT })
  }

  const value = {
    count,
    incrementCount,
    decrementCount,
    resetCount,
  }

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  )
}
