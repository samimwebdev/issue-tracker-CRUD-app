import { Table } from 'react-bootstrap'
import Issue from './Issue'
const Issues = ({ issues, deleteIssue, completeIssue }) => {
  return (
    <>
      <h1>All Issues...</h1>
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
            <Issue
              key={issue.id}
              issue={issue}
              deleteIssue={deleteIssue}
              completeIssue={completeIssue}
            />
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Issues
