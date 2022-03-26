import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import TextInput from '../formInputs/TextInput'
import useFormValidate from '../hooks/useFormValidate'
import validateLogin from './validateLogin'

const initialState = {
  email: '',
  password: '',
}

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)

  const { saveAuthInfo } = useContext(AuthContext)
  const { handleChange, values, errors, handleSubmit } = useFormValidate(
    initialState,
    validateLogin,
    authenticate
  )

  async function authenticate() {
    const { email, password } = values
    const authInfo = {
      identifier: email,
      password,
    }
    try {
      setSubmitting(true)
      const response = await axios.post(
        'http://localhost:1337/api/auth/local',
        authInfo
      )
      setSubmitting(false)

      //save user data to context
      saveAuthInfo(response.data)

      toast.success('Login Successful')

      //redirecting to the other pages  or show a toast message

      navigate(location?.state?.from || '/issues')

      //on Reload fetching data from localStorge and set
    } catch (err) {
      toast.error(err.response.data.error.message)
      console.log(err.response)
    }
  }

  const { email, password } = values

  return (
    <Row>
      <h1 className='mb-4 mt-4 text-center'>Login</h1>
      <Col sm={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit} noValidate>
          <TextInput
            label='email'
            type='email'
            name='email'
            onChange={handleChange}
            value={email}
            placeholder='Enter your email'
            error={errors?.email}
          />

          <TextInput
            label='password'
            type='password'
            name='password'
            onChange={handleChange}
            value={password}
            placeholder='Enter your password'
            error={errors?.password}
          />

          <div className='mt-4'>
            <Button
              variant='primary'
              disabled={submitting ? true : false}
              size='md'
              className='me-3'
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
