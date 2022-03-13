import IssueForm from './IssueForm'

const AddIssue = ({ addIssue }) => {
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
