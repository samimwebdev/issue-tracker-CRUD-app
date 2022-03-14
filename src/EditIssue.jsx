import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useIssueContext } from './context/IssueContext'
import IssueForm from './IssueForm'
const EditIssue = () => {
  const { updateIssue, issues } = useIssueContext()
  const [issue, setIssue] = useState(null)
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
    console.log(issue)
    updateIssue(issue)
  }

  return (
    <>
      <IssueForm updateIssue={handleUpdateIssue} issue={issue} />
    </>
  )
}

export default EditIssue
