import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import AddIssue from './AddIssue'
import IssueBar from './IssueBar'
import Issues from './Issues'
import Navigation from './Navigation'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import EditIssue from './EditIssue'

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

  // const pickIssueToUpdate = (id) => {
  //   const issue = issues.find((issue) => issue.id === id)
  //   console.log('calling...')
  //   // if (!issue) {
  //   //   toast('No Issue Found to be edit')
  //   //   return navigate('/issues')
  //   // }

  //   const pick = setPickedIssue(issue)
  //   return issue
  // }

  const deleteIssue = (id) => {
    console.log(id)

    //filter the issues other than the deleted one
    const issuesAfterDelete = issues.filter((issue) => issue.id !== id)
    // if yes the issue will be deleted
    setIssues(issuesAfterDelete)

    //show toast message after deletion of the issue
  }
  const updateIssue = (pickedIssue) => {
    const updatedIssue = issues.map((issue) => {
      if (issue.id === pickedIssue.id) {
        return {
          id: issue.id,
          ...pickedIssue,
        }
      } else {
        return issue
      }
    })
    setIssues(updatedIssue)
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
    <BrowserRouter>
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
            <Routes>
              <Route
                path='/issues/add'
                element={<AddIssue addIssue={addIssue} />}
              ></Route>{' '}
              <Route
                index
                path='/edit/:id'
                element={
                  <EditIssue issues={issues} updateIssue={updateIssue} />
                }
              ></Route>{' '}
              <Route
                path='/issues'
                element={
                  <Issues
                    issues={issues}
                    deleteIssue={deleteIssue}
                    completeIssue={completeIssue}
                    totalCount={totalCount}
                    newCount={newCount}
                    progressCount={progressCount}
                    completedCount={completedCount}
                  />
                }
              />
            </Routes>
          </Container>
        </Col>
      </Row>
    </BrowserRouter>
  )
}

export default App
