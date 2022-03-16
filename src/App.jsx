import { useState, useReducer, useContext } from 'react'
import { CounterContext } from './context/CounterContext'

const App = () => {
  const context = useContext(CounterContext)
  const { count, incrementCount, decrementCount, resetCount } = context
  // const [count, setCount] = useState(0)

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
