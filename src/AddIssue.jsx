import { useContext } from 'react'
import { useIssueContext } from './context/IssueContext'
import IssueForm from './IssueForm'

const AddIssue = () => {
  console.log(useIssueContext())
  const { addIssue } = useIssueContext()
  const handleAddIssue = (issue) => {
    addIssue(issue)
    //addIssue
  }
  return (
    <>
      <IssueForm addIssue={handleAddIssue} />
    </>
  )
}

export default AddIssue
