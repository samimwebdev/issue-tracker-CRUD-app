import IssueForm from './IssueForm'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IssueContext } from './context/IssueContext'
import { toast } from 'react-toastify'

const EditIssue = () => {
  const [issue, setIssue] = useState(null)
  const { issues, updateIssue } = useContext(IssueContext)
  const navigate = useNavigate()
  const { id } = useParams()
  console.log(typeof id)
  const issueToEdit = () => {
    const foundIssue = issues.find((issue) => issue.id === parseInt(id))
    if (!foundIssue) {
      toast.error('Issue is not found to be updated')
      return navigate('/issues')
    }
    setIssue(foundIssue)
  }

  console.log(issue)

  useEffect(() => {
    issueToEdit()
  }, [id])

  const handleUpdateIssue = (issue) => {
    updateIssue(issue)
  }

  return <IssueForm updateIssue={handleUpdateIssue} issue={issue} />
}

export default EditIssue
