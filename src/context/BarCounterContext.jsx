import { createContext, useState } from 'react'
export const BarCounterContext = createContext()

export const BarCounterContextProvider = ({ children }) => {
  const [totalCount, setTotalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  const value = {
    totalCount,
    newCount,
    progressCount,
    completedCount,
    setTotalCount,
    setNewCount,
    setProgressCount,
    setCompletedCount,
  }

  return (
    <BarCounterContext.Provider value={value}>
      {children}
    </BarCounterContext.Provider>
  )
}
