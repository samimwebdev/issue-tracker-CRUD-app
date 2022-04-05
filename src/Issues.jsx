import { useContext } from 'react'
import { Pagination, Table } from 'react-bootstrap'
import { IssueContext } from './context/IssueContext'
import Issue from './Issue'
import IssueBar from './IssueBar'

const generateArr = (num) => {
  const arr = []
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  return arr
}

const Issues = () => {
  const { issues, pageCount, pageNumber, setPageNumber } =
    useContext(IssueContext)
  const pageCountArr = generateArr(pageCount)
  const handlePageClick = (evt) => {
    setPageNumber(+evt.target.dataset.id)
  }
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
        {pageCountArr.map((count, i) => {
          return (
            <Pagination.Item
              onClick={handlePageClick}
              active={count === pageNumber}
              data-id={count}
              key={i}
            >
              {count}
            </Pagination.Item>
          )
        })}
      </Pagination>
    </>
  )
}

export default Issues
