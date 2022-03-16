import { useContext } from 'react'
import { Table } from 'react-bootstrap'
import { IssueContext } from './context/IssueContext'
import Issue from './Issue'
import IssueBar from './IssueBar'

const Issues = () => {
  const { issues } = useContext(IssueContext)
  return (
    <>
      <h1>All Issues...</h1>
      <IssueBar />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>status</th>
            <th>Due Date</th>
            <th>Assigned To</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <Issue key={issue.id} issue={issue} />
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Issues
