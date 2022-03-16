import IssueForm from './IssueForm'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IssueContext } from './context/IssueContext'

const EditIssue = () => {
  const [issue, setIssue] = useState(null)
  const { issues, updateIssue } = useContext(IssueContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === id)
    if (!foundIssue) {
      toast.error('Issue is not found to be updated')
      return navigate('/issues')
    }
    setIssue(foundIssue)
  }

  useEffect(() => {
    issueToEdit()
  }, [id])

  const handleUpdateIssue = (issue) => {
    updateIssue(issue)
  }

  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />
}

export default EditIssue
