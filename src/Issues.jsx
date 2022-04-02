import { useContext } from 'react'
import { Pagination, Table } from 'react-bootstrap'
import { IssueContext } from './context/IssueContext'
import Issue from './Issue'
import IssueBar from './IssueBar'

const Issues = () => {
  const { issues, setPageNumber } = useContext(IssueContext)
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

      <Pagination style={{ justifyContent: 'center' }}>
        <Pagination.Item
          onClick={() => setPageNumber((pageNum) => pageNum - 1)}
        >
          Prev
        </Pagination.Item>
        <Pagination.Item
          onClick={() => setPageNumber((pageNum) => pageNum + 1)}
        >
          Next
        </Pagination.Item>
      </Pagination>
    </>
  )
}

export default Issues
