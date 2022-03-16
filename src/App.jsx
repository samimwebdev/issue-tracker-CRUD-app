import { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount((count) => count + 1)
  }

  const decrementCount = () => {
    setCount((count) => count - 1)
  }

  const resetCount = () => {
    setCount(0)
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
