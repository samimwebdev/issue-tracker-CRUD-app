import IssueForm from './IssueForm'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IssueContext } from './context/IssueContext'
import axiosAPI from './utils/axiosAPI'
import useToken from './hooks/useToken'
import formatIssue from './utils/formatIssue'
import { parseISO } from 'date-fns'

const EditIssue = () => {
  const [issue, setIssue] = useState(null)
  const { token, tokenLoaded } = useToken()
  const { issues, updateIssue } = useContext(IssueContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const issueToEdit = async () => {
    const data = await axiosAPI({
      method: 'get',
      url: `/issues/${+id}?populate=assignedTo`,
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const issue = formatIssue(data.data)
    console.log(issue)
    setIssue({
      ...issue,
      startDate: parseISO(issue.startDate),
      endDate: parseISO(issue.endDate),
      assignedTo: issue.assignedTo.data.id,
    })
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      issueToEdit()
    }
  }, [id, tokenLoaded])

  const handleUpdateIssue = (issue) => {
    updateIssue(issue)
  }

  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />
}

export default EditIssue
