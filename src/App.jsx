import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import AddIssue from './AddIssue'
import IssueBar from './IssueBar'
import Issues from './Issues'
import Navigation from './Navigation'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'

const App = () => {
  const [issues, setIssues] = useState([
    {
      id: '5bc87295-bbba-488d-87d6-723253fc5def',
      title: 'sample Title',
      subTitle: 'Task Details',
      assignedTo: 'samim',
      startDate: '',
      endDate: '',
      completed: false,
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

  const deleteIssue = (id) => {
    console.log(id)

    //filter the issues other than the deleted one
    const issuesAfterDelete = issues.filter((issue) => issue.id !== id)
    // if yes the issue will be deleted
    setIssues(issuesAfterDelete)

    //show toast message after deletion of the issue
  }

  const completeIssue = (id) => {
    const updatedIssue = issues.map((issue) => {
      if (issue.id === id) {
        return {
          ...issue,
          status: 'completed',
          completedPercentage: 100,
        }
      } else {
        return issue
      }
    })
    setIssues(updatedIssue)
  }
  return (
    <Row>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
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
          <Issues
            issues={issues}
            deleteIssue={deleteIssue}
            completeIssue={completeIssue}
          />
        </Container>
      </Col>
    </Row>
  )
}

export default App
