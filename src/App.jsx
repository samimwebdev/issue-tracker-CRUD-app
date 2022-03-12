import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AddIssue from './AddIssue'
import IssueBar from './IssueBar'
import Issues from './Issues'
import Navigation from './Navigation'
import './index.css'

const App = () => {
  const [issues, setIssues] = useState([
    {
      id: '5bc87295-bbba-488d-87d6-723253fc5def',
      title: 'sample Title',
      subTitle: 'Task Details',
      assignedTo: 'samim',
      startDate: '',
      endDate: '',
      priority: 'medium',
      status: 'new',
      completedPercentage: 90,
    },
  ])

  const [totalCount, setTotalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  const addIssue = (issue) => {
    setIssues((prevIssues) => [...prevIssues, issue])

    setTotalCount((prevCount) => prevCount + 1)
    if (issue.status === 'new') {
      setNewCount((prevCount) => prevCount + 1)
    }
    if (issue.status === 'inProgress') {
      setProgressCount((prevCount) => prevCount + 1)
    }

    if (issue.status === 'completed') {
      setCompletedCount((prevCount) => prevCount + 1)
    }
  }
  return (
    <Row>
      <Navigation />
      <Col sm={{ span: 10, offset: 1 }}>
        <Container>
          <AddIssue addIssue={addIssue} />
          <IssueBar
            totalCount={totalCount}
            newCount={newCount}
            progressCount={progressCount}
            completedCount={completedCount}
          />
          <Issues issues={issues} />
        </Container>
      </Col>
    </Row>
  )
}

export default App
