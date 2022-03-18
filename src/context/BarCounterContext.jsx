import { createContext, useContext, useReducer, useState } from 'react'
import {
  ADD_ISSUE_COUNTER,
  DELETE_ISSUE_COUNTER,
  UPDATE_ISSUE_COUNTER,
} from '../actions'
import { barCounterReducer } from '../barCounterReducer'

//creating context  for bar counter
export const BarCounterContext = createContext()

const initialState = {
  totalCount: 0,
  newCount: 1,
  progressCount: 0,
  completedCount: 0,
}

export const BarCounterContextProvider = ({ children }) => {
  const [counter, dispatch] = useReducer(barCounterReducer, initialState)
  // const [totalCount, setTotalCount] = useState(0)
  // const [newCount, setNewCount] = useState(0)
  // const [progressCount, setProgressCount] = useState(0)
  // const [completedCount, setCompletedCount] = useState(0)

  const counterOnIssueAdd = (issue) => {
    dispatch({ type: ADD_ISSUE_COUNTER, payload: issue })
  }

  const counterOnIssueUpdate = (issue) => {
    dispatch({ type: UPDATE_ISSUE_COUNTER, payload: issue })
  }

  const counterOnIssueDelete = (issue) => {
    dispatch({ type: DELETE_ISSUE_COUNTER, payload: issue })
  }
  const { totalCount, newCount, progressCount, completedCount } = counter

  const value = {
    counterOnIssueUpdate,
    counterOnIssueDelete,
    totalCount,
    newCount,
    progressCount,
    completedCount,
    counterOnIssueAdd,
  }

  return (
    <BarCounterContext.Provider value={value}>
      {children}
    </BarCounterContext.Provider>
  )
}
