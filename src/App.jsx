import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AddIssue from './AddIssue'
import EditIssue from './EditIssue'
import Issues from './Issues'
import Home from './Home'
import NotFound from './NotFound'
import Navigation from './Navigation'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import IssueForm from './IssueForm'

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
    console.log(issue)
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
    const issuesAfterDelete = issues.filter((issue) => issue.id !== id)
    setIssues(issuesAfterDelete)
  }

  const updateIssue = (issueToUpdate) => {
    // parseInt(issueToUpdate.completedPercentage) < 100
    //           ? 'inProgress'
    //           : issueToUpdate.status,
    const issuesAfterUpdate = issues.map((issue) => {
      if (issue.id === issueToUpdate.id) {
        console.log(issueToUpdate)
        return {
          ...issueToUpdate,
          id: issue.id,
          status: issueToUpdate.status,
        }
      } else {
        return issue
      }
    })

    console.log(issuesAfterUpdate)

    setIssues(issuesAfterUpdate)
  }

  const completeIssue = (id) => {
    console.log(id)
    //map
    //filter
    const issuesAfterCompletion = issues.map((issue) => {
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

    setIssues(issuesAfterCompletion)
  }

  return (
    <>
      <ToastContainer
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      <Row>
        <BrowserRouter>
          <Navigation />
          <Col sm={{ span: 10, offset: 1 }}>
            <Container>
              <Routes>
                <Route path='/' index element={<Home />} />
                <Route path='/add' element={<AddIssue addIssue={addIssue} />} />
                <Route
                  path='/edit/:id'
                  element={
                    <EditIssue issues={issues} updateIssue={updateIssue} />
                  }
                />
                <Route
                  path='/issues'
                  element={
                    <Issues
                      issues={issues}
                      newCount={newCount}
                      totalCount={totalCount}
                      completedCount={completedCount}
                      progressCount={progressCount}
                      completeIssue={completeIssue}
                      deleteIssue={deleteIssue}
                    />
                  }
                />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  )
}

///* <EditIssue issues={issues} updateIssue={updateIssue} /> */

export default App
