import { Col, Row } from 'react-bootstrap'
import { useContext } from 'react'
import { BarCounterContext } from './context/BarCounterContext'

const IssueBar = () => {
  const { newCount, totalCount, progressCount, completedCount } =
    useContext(BarCounterContext)
  return (
    <Row className='mt-4'>
      <Col>
        {' '}
        <span>Total: </span> {totalCount}
      </Col>
      <Col>
        {' '}
        <span className='text-primary'>new: </span> {newCount}
      </Col>
      <Col>
        {' '}
        <span className='text-info'>In Progress: </span> {progressCount}
      </Col>
      <Col>
        {' '}
        <span className='text-success'>completed: </span> {completedCount}
      </Col>
    </Row>
  )
}

export default IssueBar
