import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import TextInput from '../formInputs/TextInput'
import useFormValidate from '../hooks/useFormValidate'
import validateRegister from './validateRegister'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const schema = yup
  .object({
    username: yup
      .string('must be string')
      .required('username is required')
      .min(5, 'username must be in 5 character in length'),
    email: yup
      .string()
      .email('Email must be in correct format')
      .trim('Trimmed down')
      .lowercase()
      .required('Email is Required'),
    password: yup.string().required('password is required'),
    confirmPassword: yup
      .string()
      .required('confirm password is required')
      .oneOf([yup.ref('password')], 'Ypur password do not match'),
  })
  .required()

const Register = () => {
  const navigate = useNavigate()
  const { saveAuthInfo } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const { username, email, password } = data

    try {
      const response = await axios.post(
        'http://localhost:1337/api/auth/local/register',
        {
          username,
          email,
          password,
        }
      )
      console.log(response.data)

      //save user data to context
      saveAuthInfo(response.data)

      //redirecting to the other pages  or show a toast message
      navigate('/login')
      toast.success('registration Successful')
      //on Reload fetching data from localStorge and set
    } catch (err) {
      toast.error(err.response.data.error.message)
      console.log(err.response)
    }
  }

  return (
    <Row>
      <h1 className='mb-4 mt-4 text-center'>Register</h1>
      <Col sm={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='username' column>
                username
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                id='username'
                {...register('username')}
                isInvalid={errors?.username}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors.username?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='email' column>
                email
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                id='email'
                {...register('email')}
                isInvalid={errors.email}
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
                isInvalid={errors?.password}
                {...register('password')}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors.password?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='confirmPassword' column>
                confirm Password
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='password'
                id='confirmPassword'
                isInvalid={errors.confirmPassword}
                {...register('confirmPassword')}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors.confirmPassword?.message}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          {/* <TextInput
            label='username'
            type='text'
            name='username'
            onChange={handleChange}
            value={username}
            placeholder='Enter your user name'
            error={errors?.username}
          />
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

          <TextInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            onChange={handleChange}
            value={confirmPassword}
            placeholder='Enter your confirm password'
            error={errors?.confirmPassword}
          /> */}

          <div className='mt-4'>
            <Button
              variant='primary'
              disabled={isSubmitting}
              size='md'
              className='me-3'
              type='submit'
            >
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
