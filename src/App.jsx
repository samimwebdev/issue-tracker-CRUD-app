import { useContext, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom'

import AddIssue from './AddIssue'
import EditIssue from './EditIssue'
import Issues from './Issues'
import Home from './Home'
import NotFound from './NotFound'
import Navigation from './Navigation'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import Register from './auth/Register'
import Login from './auth/Login'
import { AuthContext } from './context/AuthContext'

const PublicRoute = ({ children }) => {
  const location = useLocation()
  console.log(location.pathname)
  const { user, userLoaded } = useContext(AuthContext)
  if (userLoaded) {
    if (!user) return children
    return <Navigate to='/issues'></Navigate>
  } else {
    return (
      <div
        style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <Spinner animation='grow' size='lg' />
      </div>
    )
  }
}

const AuthRequired = ({ children }) => {
  const location = useLocation()
  const { user, userLoaded } = useContext(AuthContext)
  if (userLoaded) {
    if (user) return children
    return <Navigate to='/login' state={{ from: location.pathname }}></Navigate>
  } else {
    return (
      <div
        style={{ display: 'grid', minHeight: '100vh', placeItems: 'center' }}
      >
        <Spinner animation='grow' size='lg' />
      </div>
    )
  }
}

const App = () => {
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
                {/* public route */}
                <Route path='/' index element={<Home />} />
                <Route
                  path='/register'
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                  }
                />
                <Route
                  path='/login'
                  element={
                    <PublicRoute>
                      <Login />
                    </PublicRoute>
                  }
                />
                <Route path='*' element={<NotFound />} />
                {/* private route */}

                <Route
                  path='/issues'
                  element={
                    <AuthRequired>
                      <Issues />
                    </AuthRequired>
                  }
                />
                <Route
                  path='/add'
                  element={
                    <AuthRequired>
                      <AddIssue />
                    </AuthRequired>
                  }
                />
                <Route
                  path='/edit/:id'
                  element={
                    <AuthRequired>
                      <EditIssue />
                    </AuthRequired>
                  }
                />
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  )
}

export default App
