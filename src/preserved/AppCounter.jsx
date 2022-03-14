import { useReducer, useState, createContext, useContext } from 'react'
import {
  decrement,
  increment,
  reset,
  useCountContext,
} from './context/CountContext'

// const INCREMENT = 'INCREMENT'
// const DECREMENT = 'DECREMENT'
// const RESET = 'RESET'

// const increment = (dispatch, num) => {
//   return dispatch({
//     type: INCREMENT,
//     payload: num,
//   })
// }

const App = () => {
  //   const [count, setCount] = useState(0)
  const { dispatch, count } = useCountContext()

  //   const { count, dispatch } = useCountContext()

  const incrementCount = () => {
    increment(dispatch, 10)
    // setCount(count + 1)
    // increment(dispatch, 10)
    // setCount((prevCount) => prevCount + 1)
  }

  const decrementCount = () => {
    // setCount(() => count - 1)
    // decrement(dispatch, 5)
    decrement(dispatch, 10)
  }

  const resetCount = () => {
    // setCount(0)
    // reset(dispatch, 0)
    reset(dispatch, 0)
  }

  return (
    <div className='app'>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  )
}

export default App
