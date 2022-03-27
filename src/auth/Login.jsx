//username
//email
//password

import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { toast } from 'react-toastify'

const schema = yup.object({
  email: yup
    .string()
    .email('Must be valid email')
    .trim()
    .lowercase()
    .required('Email is Required'),
  password: yup.string().required('Password is Required'),
})

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { saveAuthInfo } = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const submit = async (data) => {
    const { email, password } = data

    try {
      // api request to the server
      const res = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: email,
        password,
      })
      // on successful response navigate to issues route
      saveAuthInfo(res.data)
      toast.success('Login successful')
      navigate(location?.state?.from || '/issues')
    } catch (err) {
      toast.error(err.response.data.error.message)
    }
  }
  return (
    <Row>
      <h2 className='mb-4 mt-4 text-center'>Login</h2>
      <Col sm={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='email' column>
                Email
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                id='email'
                placeholder='Enter email'
                isInvalid={errors.email}
                {...register('email')}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors.email?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='password' column>
                password
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='password'
                id='password'
                placeholder='Enter password'
                isInvalid={errors.password}
                {...register('password')}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <div className='mt-4'>
            <Button
              variant='primary'
              disabled={isSubmitting}
              size='md'
              className='m3-3'
              type='submit'
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
