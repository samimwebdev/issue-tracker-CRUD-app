import { Table } from 'react-bootstrap'
import Issue from './Issue'
import IssueBar from './IssueBar'

const Issues = ({
  issues,
  newCount,
  totalCount,
  progressCount,
  completeIssue,
  completedCount,
  deleteIssue,
}) => {
  return (
    <>
      <h1>All Issues...</h1>
      <IssueBar
        totalCount={totalCount}
        newCount={newCount}
        progressCount={progressCount}
        completedCount={completedCount}
      />
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
              completeIssue={completeIssue}
              deleteIssue={deleteIssue}
            />
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default Issues
