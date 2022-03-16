import { createContext, useContext, useReducer } from 'react'
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
  COMPLETE_ISSUE,
} from '../actions'
import { issueReducer } from '../issueReducer'
import { BarCounterContext } from './BarCounterContext'

export const IssueContext = createContext()

const initialState = [
  {
    id: '5bc87295-bbba-488d-87d6-723253fc5def',
    title: 'sample Title',
    subTitle: 'Task Details',
    assignedTo: 'samim',
    startDate: new Date(),
    endDate: new Date(),
    priority: 'medium',
    status: 'new',
    completedPercentage: 90,
  },
]

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState)
  const { setTotalCount, setNewCount, setProgressCount, setCompletedCount } =
    useContext(BarCounterContext)

  const addIssue = (issue) => {
    dispatch({ type: ADD_ISSUE, payload: issue })

    setTotalCount((prevCount) => prevCount + 1)
    if (issue.status === 'new') {
      setNewCount((prevCount) => prevCount + 1)
    }
    if (issue.status === 'inProgress') {
      setProgressCount((prevCount) => prevCount + 1)
    }

    if (issue.status === 'completed') {
      setCompletedCount((prevCount) => prevCount + 1)
    }
  }

  const deleteIssue = (id) => {
    dispatch({ type: DELETE_ISSUE, payload: id })
  }

  const updateIssue = (issueToUpdate) => {
    dispatch({ type: UPDATE_ISSUE, payload: issueToUpdate })
  }

  const completeIssue = (id) => {
    dispatch({ type: COMPLETE_ISSUE, payload: id })
  }

  const value = {
    issues,
    addIssue,
    deleteIssue,
    updateIssue,
    completeIssue,
  }

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
}
