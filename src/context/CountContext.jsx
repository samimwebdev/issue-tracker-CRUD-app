import { createContext, useContext, useReducer } from 'react'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const RESET = 'RESET'

export const increment = (dispatch, num) => {
  return dispatch({
    type: INCREMENT,
    payload: num,
  })
}

export const decrement = (dispatch, num) => {
  return dispatch({
    type: DECREMENT,
    payload: num,
  })
}

export const reset = (dispatch, num) => {
  return dispatch({
    type: RESET,
    payload: num,
  })
}

export const CountContext = createContext()

const reducer = (state, action) => {
  console.log(state, action)
  if (action.type === INCREMENT) {
    return state + action.payload
  } else if (action.type === DECREMENT) {
    return state - action.payload
  } else if (action.type === RESET) {
    return 0
  } else {
    return state
  }
}

export const CountProvider = ({ children }) => {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <CountContext.Provider value={{ count, dispatch }}>
      {children}
    </CountContext.Provider>
  )
}

export const useCountContext = () => useContext(CountContext)
