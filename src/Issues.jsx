import { Table, Badge, ProgressBar } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaCheckSquare } from 'react-icons/fa'

const Issues = ({ issues }) => {
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
          {issues.map((issue) => {
            const {
              id,
              title,
              priority,
              status,
              endDate,
              assignedTo,
              completedPercentage,
            } = issue

            const lowClass = priority === 'low' ? 'primary' : ''
            const highClass = priority === 'high' ? 'danger' : ''
            const mediumClass = priority === 'medium' ? 'info' : ''
            const lowPercentageClass = completedPercentage < 30 ? 'danger' : ''
            const mediumPercentageClass =
              completedPercentage > 40 && completedPercentage <= 70
                ? 'info'
                : ''
            const HighPercentageClass =
              completedPercentage > 70 ? 'success' : ''

            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>
                  <Badge bg={`${lowClass}${highClass}${mediumClass}`} pill>
                    {priority}
                  </Badge>
                </td>
                <td>{status}</td>
                <td>{endDate}</td>
                <td>{assignedTo}</td>
                <td>
                  <ProgressBar
                    variant={`${HighPercentageClass}${mediumPercentageClass}${lowPercentageClass}`}
                    label={completedPercentage}
                    now={completedPercentage}
                    striped
                    animated
                  />
                </td>
                <td className='d-flex justify-content-between'>
                  <FaEdit className='text-info' />
                  <FaCheckSquare className='text-success' />
                  <FaTrashAlt className='text-danger' />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}

export default Issues
