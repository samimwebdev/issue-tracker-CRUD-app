import axios from 'axios'
import { createContext, useContext, useReducer, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
  COMPLETE_ISSUE,
  GET_ISSUES,
} from '../actions'
import useToken from '../hooks/useToken'
import { issueReducer } from '../issueReducer'
import formatIssues from '../utils/formatIssues'
import formatIssue from '../utils/formatIssue'
import { BarCounterContext } from './BarCounterContext'
import { AuthContext } from './AuthContext'
import axiosAPI from '../utils/axiosAPI'

export const IssueContext = createContext()

const initialState = []

export const IssueProvider = ({ children }) => {
  const [issues, dispatch] = useReducer(issueReducer, initialState)
  const { token, tokenLoaded } = useToken()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { counterOnIssueAdd, counterOnIssueUpdate, counterOnIssueDelete } =
    useContext(BarCounterContext)

  const loadIssues = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: '/issues',
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      // const res = await axios.get('http://localhost:1337/api/issues', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })

      const issues = formatIssues(data.data)
      dispatch({ type: GET_ISSUES, payload: issues })
    } catch (err) {
      console.log(err.response)
    }
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      //load Issues from server
      loadIssues()
    }
  }, [tokenLoaded, token])

  const addIssue = async (issue) => {
    const formattedIssue = {
      ...issue,
      assigned_to: 1,
      sub_title: issue.subTitle,
      start_date: issue.startDate,
      end_date: issue.endDate,
      completed_percentage: issue.completedPercentage,
    }
    //at first send  data to the server and get back data
    try {
      const data = await axiosAPI({
        method: 'post',
        url: '/issues',
        data: {
          data: formattedIssue,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      const addedIssue = formatIssue(data.data)
      // const issues = formatIssues(res.data.data)

      dispatch({ type: ADD_ISSUE, payload: addedIssue })
      toast.success('Issue is added successfully')
      navigate('/issues')
      //counter update on issue add
      counterOnIssueAdd(issue)
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
  }

  const deleteIssue = async (id) => {
    try {
      const data = await axiosAPI({
        method: 'delete',
        url: `/issues/${id}`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      console.log(data)

      const issue = issues.find((issue) => issue.id === data.data.id)
      dispatch({ type: DELETE_ISSUE, payload: data.data.id })
      //update counter on deleting issue
      toast.success('Issue is deleted successfully')
      counterOnIssueDelete(issue)
    } catch (err) {
      console.log(err)
      console.log(err.response)
    }
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
