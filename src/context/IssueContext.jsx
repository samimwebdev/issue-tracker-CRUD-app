import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import qs from 'qs'
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
  const [pageNumber, setPageNumber] = useState(1)
  const [pageCount, setPageCount] = useState(null)
  const [navigateRoute, setNavigateRoute] = useState(false)
  const { token, tokenLoaded } = useToken(navigateRoute)
  const [counterBar, setCounterBar] = useState({})
  const [counterLoaded, setCounterLoaded] = useState(false)
  const navigate = useNavigate()
  // const { counterOnIssueAdd, counterOnIssueUpdate, counterOnIssueDelete } =
  //   useContext(BarCounterContext)

  const loadIssues = async () => {
    const query = qs.stringify(
      {
        pagination: {
          page: pageNumber,
          pageSize: import.meta.env.VITE_PAGE_SIZE,
        },
        populate: ['assignedTo'],
      },
      {
        encodeValuesOnly: true,
      }
    )

    try {
      const { data, meta } = await axiosAPI({
        method: 'get',

        url: `/issues?${query}`,

        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      const issues = formatIssues(data)

      setPageCount(meta.pagination.pageCount)
      dispatch({ type: GET_ISSUES, payload: issues })
      /// update issue bar based on loaded issue
    } catch (err) {
      toast.error(err.response.data?.error?.message)
    }
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      //load Issues from server
      loadIssues()
    }
  }, [tokenLoaded, token, pageNumber])

  async function loadCounter() {
    try {
      const data = await axiosAPI({
        method: 'get',
        url: `/issues/count`,
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      setCounterBar(data)
    } catch (err) {
      toast.error(err.response.data?.error?.message)
    }
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      loadCounter()
    }
  }, [tokenLoaded, token, counterLoaded])

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
      setCounterLoaded(false)
      const data = await axiosAPI({
        method: 'post',
        url: '/issues?populate=assignedTo',
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

      dispatch({ type: ADD_ISSUE, payload: addedIssue })

      setCounterLoaded(true)
      toast.success('Issue is added successfully')
      navigate('/issues')
      //counter update on issue add
      // counterOnIssueAdd(issue)
    } catch (err) {
      toast.error(err.response.data?.error?.message)
    }
  }

  const deleteIssue = async (id) => {
    setCounterLoaded(false)
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

      // const issue = issues.find((issue) => issue.id === data.data.id)
      dispatch({ type: DELETE_ISSUE, payload: data.data.id })
      //update counter on deleting issue
      setCounterLoaded(true)
      toast.success('Issue is deleted successfully')
      // counterOnIssueDelete(issue)
    } catch (err) {
      toast.error(err.response.data?.error?.message)
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
    //at first send  data to the server and get back data
    try {
      const { data } = await axiosAPI({
        method: 'put',
        url: `/issues/${issueToUpdate.id}?populate=assignedTo`,
        data: {
          data: formattedIssue,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      const updatedIssue = formatIssue(data)
      //before updating the we should capture the existing issue status
      //so that we can subtract in existing counter
      // const issue = issues.find((issue) => issue.id === issueToUpdate.id)

      // const updatedIssueWithExistingStatus = {
      //   ...updatedIssue,
      //   existingIssueStatus: issue.status,
      // }
      dispatch({ type: UPDATE_ISSUE, payload: updatedIssue })

      counterOnIssueUpdate(updatedIssueWithExistingStatus)
      // const issues = formatIssues(res.data.data)
      toast.success('Issue is updated successfully')
      navigate('/issues')
    } catch (err) {
      toast.error(err.response.data?.error?.message)
      setCounterLoaded(true)
      toast.success('Issue is Updated successfully')
      // counterOnIssueUpdate(updatedIssueWithExistingStatus)
      return navigate('/issues')
    }
  }

  const completeIssue = async (id) => {
    const updatedData = {
      status: 'completed',
      completed_percentage: 100,
    }
    setCounterLoaded(false)
    //at first send  data to the server and get back data
    try {
      const { data } = await axiosAPI({
        method: 'put',
        url: `/issues/completed/${id}`,
        data: {
          data: updatedData,
        },
        config: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })

      //before updating the we should capture the existing issue status
      dispatch({ type: COMPLETE_ISSUE, payload: data.id })
      setCounterLoaded(true)
      /// update issue bar based on completed issue
      toast.success('Issue is completed successfully')
    } catch (err) {
      console.log(err)
      toast.error(err.response.data?.error?.message)
    }
  }

  const value = {
    issues,
    addIssue,
    deleteIssue,
    updateIssue,
    completeIssue,
    pageCount,
    pageNumber,
    setPageNumber,
    setNavigateRoute,
    counterBar,
  }

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
}
