import axios from 'axios'
import { format } from 'date-fns'
import { createContext, useContext, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  privateAPIInstance,
  publicAPIInstance,
} from '../../utils/configureAxios'
import {
  ADD_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
  COMPLETE_ISSUE,
  GET_ISSUES,
} from '../actions'
import useIssueAPI from '../hooks/useIssueAPI'
import useToken from '../hooks/useToken'
import { issueReducer } from '../issueReducer'
import { formateIssue, formateIssues } from '../utils/formatIssues'
import { AuthContext } from './AuthContext'
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

  const [error, loading, handleIssueAPI, addIssues] = useIssueAPI()
  const { user } = useContext(AuthContext)
  const token = useToken()
  const { counterOnIssueAdd, counterOnIssueUpdate, counterOnIssueDelete } =
    useContext(BarCounterContext)

  const getIssues = async () => {
    const res = await handleIssueAPI({
      axiosInstance: publicAPIInstance,
      method: 'get',
      url: `/issues?sort[0]=id:desc`,
    })

    console.log(res)
    // console.log(response, error, loading)

    // const res = await axios.get('http://localhost:1337/api/issues')
    const issues = formateIssues(res.data)

    dispatch({ type: GET_ISSUES, payload: issues })
  }
  useEffect(() => {
    getIssues()
  }, [])

  const addIssue = async (issue) => {
    const formattedIssue = {
      ...issue,
      sub_title: issue.subTitle,
      start_date: issue.startDate,
      end_date: issue.endDate,
      completed_percentage: issue.completedPercentage,
      author: 15,
    }

    const res = await handleIssueAPI({
      axiosInstance: privateAPIInstance,
      method: 'post',
      url: '/issues',
      data: {
        data: formattedIssue,
      },
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const addedIssue = formateIssue(res.data)
    console.log(addedIssue)

    // const res = await handleIssueAPI({
    //   axiosInstance: privateAPIInstance,
    //   method: 'post',
    //   url: '/issues',
    //   data: formateIssues,
    //   requestConfig: {},
    // })
    // console.log(res)
    //adding issue on the server amd them update state

    // if (token) {
    //   const res = await axios.post(
    //     'http://localhost:1337/api/issues',
    //     {
    //       data: formattedIssue,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    console.log(err)

    try {
      dispatch({
        type: ADD_ISSUE,
        payload: addedIssue,
      })
      //counter update on issue add
      counterOnIssueAdd(addedIssue)
    } catch (err) {
      console.log(err.response)
      toast.error(err.response.data.error.message)
    }
  }

  const deleteIssue = async (id) => {
    if (token) {
      try {
        const res = await axios.delete(
          `http://localhost:1337/api/issues/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({ type: DELETE_ISSUE, payload: id })
        //update counter on deleting issue
        counterOnIssueDelete(res.data.data.attributes)
        console.log(res.data)
      } catch (err) {
        console.log(err.response)
        toast.error(err.response.data.error.message)
      }
    } else {
      toast.error('please login to add Issue')
    }
  }

  const updateIssue = async (issueToUpdate) => {
    //before updating the we should capture the existing issue status
    //so that we can subtract in existing counter

    const formattedIssue = {
      ...issueToUpdate,
      sub_title: issueToUpdate.subTitle,
      start_date: issueToUpdate.startDate,
      end_date: issueToUpdate.endDate,
      completed_percentage: issueToUpdate.completedPercentage,
    }

    if (token) {
      try {
        const res = await axios.put(
          `http://localhost:1337/api/issues/${issueToUpdate.id}`,
          {
            data: formattedIssue,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const issueAfterUpdates = {
          id: res.data.data.id,
          ...res.data.data.attributes,
        }

        console.log(issueAfterUpdates)
        const issue = issues.find((issue) => issue.id === issueAfterUpdates.id)
        console.log(issue)

        const updatedIssueWithExistingStatus = {
          ...issueAfterUpdates,
          existingIssueStatus: issue.status,
        }
        dispatch({ type: UPDATE_ISSUE, payload: issueAfterUpdates })

        counterOnIssueUpdate(updatedIssueWithExistingStatus)
      } catch (err) {
        toast.error(err.response.data.error.message)
      }
    } else {
      toast.error(`please login to Update Isuue`)
    }
  }

  const completeIssue = async (id) => {
    if (token) {
      try {
        await axios.put(
          `http://localhost:1337/api/issues/completed/${id}`,
          {
            data: {
              status: 'completed',
              completedPercentage: 100,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        dispatch({ type: COMPLETE_ISSUE, payload: id })
      } catch (err) {
        toast.error(`Issue couldn't be updated`)
      }
    } else {
      toast.error('please Login to complete the issue')
    }
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
