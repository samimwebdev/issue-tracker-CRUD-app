import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
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
  const [pageNumber, setPageNumber] = useState(1)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { counterOnIssueAdd, counterOnIssueUpdate, counterOnIssueDelete } =
    useContext(BarCounterContext)

  const loadIssues = async () => {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: `/issues?pagination[page]=${pageNumber}&pagination[pageSize]=10`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      console.log(data)
      const issues = formatIssues(data.data)
      dispatch({ type: GET_ISSUES, payload: issues })
    } catch (err) {
      toast.error(err.response.data?.error?.message)

      console.log(err.response)
    }
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      //load Issues from server
      loadIssues()
    }
  }, [tokenLoaded, token, pageNumber])

  const addIssue = async (issue) => {
    const formattedIssue = {
      ...issue,
      assigned_to: issue.assignedTo,
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
      toast.error(err.response.data?.error?.message)
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
      toast.error(err.response.data?.error?.message)

      console.log(err.response)
    }
  }

  const updateIssue = async (issueToUpdate) => {
    const formattedIssue = {
      ...issueToUpdate,
      assigned_to: issueToUpdate.assignedTo,
      sub_title: issueToUpdate.subTitle,
      start_date: issueToUpdate.startDate,
      end_date: issueToUpdate.endDate,
      completed_percentage: issueToUpdate.completedPercentage,
    }

    try {
      const data = await axiosAPI({
        method: 'put',
        url: `/issues/${issueToUpdate.id}`,
        data: {
          data: formattedIssue,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      const updatedIssue = formatIssue(data.data)
      console.log(updatedIssue)

      //before updating the we should capture the existing issue status
      //so that we can subtract in existing counter
      const issue = issues.find((issue) => issue.id === updatedIssue.id)

      const updatedIssueWithExistingStatus = {
        ...updatedIssue,
        existingIssueStatus: issue.status,
      }
      dispatch({ type: UPDATE_ISSUE, payload: updatedIssue })

      counterOnIssueUpdate(updatedIssueWithExistingStatus)
      // const issues = formatIssues(res.data.data)
      toast.success('Issue is updated successfully')
      navigate('/issues')
    } catch (err) {
      console.log(err)
      toast.error(err.response.data?.error?.message)

      console.log(err.response)
    }
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
    setPageNumber,
    pageNumber,
  }

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
}
