import { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AddIssue from '../AddIssue'
import EditIssue from '../EditIssue'
import Issues from '../Issues'
import Home from '../Home'
import NotFound from '../NotFound'
import Navigation from '../Navigation'
import { AuthContext } from '../context/AuthContext'

import 'react-toastify/dist/ReactToastify.css'
import Register from '../auth/Register'
import Login from '../auth/Login'
import AuthRequired from './PrivateRouteGuard'
import PublicRoute from './PublicRouteGurad'

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
      </Row>
    </>
  )
}

export default App
