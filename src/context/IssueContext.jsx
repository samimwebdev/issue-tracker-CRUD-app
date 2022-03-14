import { createContext, useContext, useReducer, useState } from 'react'
import { ADD_ISSUE, COMPLETE_ISSUE, DELETE_ISSUE, UPDATE_ISSUE } from './action'

export const IssueContext = createContext()

const initialState = [
  {
    id: '5bc87295-bbba-488d-87d6-723253fc5def',
    title: 'sample Title',
    subTitle: 'Task Details',
    assignedTo: 'samim',
    startDate: '',
    endDate: '',
    priority: 'medium',
    status: 'new',
    completedPercentage: 90,
  },
]

const reducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case ADD_ISSUE:
      return [...state, payload]
    case DELETE_ISSUE:
      const issuesAfterDelete = state.filter((issue) => issue.id !== payload)
      return issuesAfterDelete
    case UPDATE_ISSUE:
      const issuesAfterUpdate = state.map((issue) => {
        if (issue.id === payload.id) {
          return {
            ...payload,
            id: issue.id,
            status:
              parseInt(payload.completedPercentage) === 100
                ? 'completed'
                : payload.status,
          }
        } else {
          return issue
        }
      })

      return issuesAfterUpdate
    case COMPLETE_ISSUE:
      const issuesAfterCompletion = state.map((issue) => {
        if (issue.id === payload) {
          return {
            ...issue,
            status: 'completed',
            completedPercentage: 100,
          }
        } else {
          return issue
        }
      })

      return issuesAfterCompletion

    default:
      return state
  }
}

export const IssueProvider = ({ children }) => {
  // const [issues, setIssues] = useState()

  const [issues, dispatch] = useReducer(reducer, initialState)

  const [totalCount, setTotalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

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
    //before updating whe should check previous status and adjust the count accordingly
    const issue = issues.find((issue) => issue.id === issueToUpdate.id)
    if (issue.status !== issueToUpdate.status) {
      if (issue.status === 'new') {
        setNewCount((prevCount) => prevCount - 1)
      }
      if (issue.status === 'inProgress') {
        setProgressCount((prevCount) => prevCount - 1)
      }

      if (issue.status === 'completed') {
        setCompletedCount((prevCount) => prevCount - 1)
      }
      if (issueToUpdate.status === 'new') {
        setNewCount((prevCount) => prevCount - 1)
      }
      if (issueToUpdate.status === 'inProgress') {
        setProgressCount((prevCount) => prevCount + 1)
      }

      if (issueToUpdate.status === 'completed') {
        setCompletedCount((prevCount) => prevCount + 1)
      }
    }
    dispatch({ type: UPDATE_ISSUE, payload: issueToUpdate })
  }

  const completeIssue = (id) => {
    dispatch({ type: COMPLETE_ISSUE, payload: id })
  }

  const value = {
    addIssue,
    updateIssue,
    deleteIssue,
    completeIssue,
    issues,
    totalCount,
    newCount,
    progressCount,
    completedCount,
  }

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
}

export const useIssueContext = () => useContext(IssueContext)
