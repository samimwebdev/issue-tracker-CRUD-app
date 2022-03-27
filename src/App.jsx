import { useState, useContext } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import AddIssue from './AddIssue'
import EditIssue from './EditIssue'
import Issues from './Issues'
import Home from './Home'
import NotFound from './NotFound'
import Navigation from './Navigation'
import { AuthContext } from './context/AuthContext'

import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import Register from './auth/Register'
import Login from './auth/Login'

const AuthRequired = ({ children }) => {
  const location = useLocation()
  const { user, userLoaded, setAuthRequired } = useContext(AuthContext)

  if (userLoaded) {
    if (!user) {
      console.log(user)

      return <Navigate to='/login' state={{ from: location.pathname }} />
    } else {
      return children
    }
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

const PublicRoute = ({ children }) => {
  const location = useLocation()
  const { user, userLoaded } = useContext(AuthContext)
  if (userLoaded) {
    if (!user) return children
    return <Navigate to={location?.state?.from || '/issues'}></Navigate>
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
        pauseOnHover={false}
        rtl={false}
      />
      <Row>
        <BrowserRouter>
          <Navigation />
          <Col sm={{ span: 10, offset: 1 }}>
            <Container>
              <Routes>
                <Route path='/' index element={<Home />} />
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
                <Route
                  path='/issues'
                  element={
                    <AuthRequired>
                      <Issues />
                    </AuthRequired>
                  }
                />
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
              </Routes>
            </Container>
          </Col>
        </BrowserRouter>
      </Row>
    </>
  )
}

export default App
