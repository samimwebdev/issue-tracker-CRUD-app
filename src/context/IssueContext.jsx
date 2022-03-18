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
  const { counterOnIssueAdd, counterOnIssueUpdate, counterOnIssueDelete } =
    useContext(BarCounterContext)

  const addIssue = (issue) => {
    dispatch({ type: ADD_ISSUE, payload: issue })
    //counter update on issue add
    counterOnIssueAdd(issue)
  }

  const deleteIssue = (id) => {
    dispatch({ type: DELETE_ISSUE, payload: id })
    const issue = issues.find((issue) => issue.id === id)
    //update counter on deleting issue
    counterOnIssueDelete(issue)
  }

  const updateIssue = (issueToUpdate) => {
    //before updating the we should capture the existing issue status
    //so that we can subtract in existing counter
    const issue = issues.find((issue) => issue.id === issueToUpdate.id)

    const updatedIssueWithExistingStatus = {
      ...issueToUpdate,
      existingIssueStatus: issue.status,
    }
    dispatch({ type: UPDATE_ISSUE, payload: issueToUpdate })

    counterOnIssueUpdate(updatedIssueWithExistingStatus)
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
