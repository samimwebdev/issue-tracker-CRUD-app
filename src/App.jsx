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

const App = () => {
  const [totalCount, setTotalCount] = useState(0)
  const [newCount, setNewCount] = useState(0)
  const [progressCount, setProgressCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

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
                <Route path='/add' element={<AddIssue />} />
                <Route path='/edit/:id' element={<EditIssue />} />
                <Route path='/issues' element={<Issues />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  )
}

export default App
