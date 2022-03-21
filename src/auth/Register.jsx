import axios from 'axios'
import { useContext, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import TextInput from '../formInputs/TextInput'

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (evt) => {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    })

    setErrors({
      ...errors,
      [evt.target.name]: '',
    })
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(userInfo)
    const { username, email, password, confirmPassword } = userInfo
    //checking error
    if (username === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'username is Required',
      }))
    }
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i
    if (email === '' || !regex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is Required and must be valid',
      }))
    }

    if (password === '' || password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          'password is Required and must be More that 6 character in length',
      }))
    }
    if (confirmPassword === '' || password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Confirm Password is Required and must match password',
      }))
    }

    // return true if every element is true, otherwise False
    const isValid = Object.values(userInfo).every((elm) => elm)
    console.log(isValid)
    if (isValid) {
      evt.preventDefault()
      //validation check
      const authInfo = {
        username,
        email,
        password,
      }
      try {
        const response = await axios.post(
          'http://localhost:1337/api/auth/local/register',
          authInfo
        )

        console.log('Well done!')
        console.log('User profile', response.data.user)
        console.log('User token', response.data.jwt)
        console.log('An error occurred:', error.response)
      } catch (err) {
        console.log(err.response)
      }

      // console.log(username, email, password, confirmPassword)
    }
  }

  const { username, email, password, confirmPassword } = userInfo

  return (
    <Row>
      <h1 className='mb-4 mt-4 text-center'>Register</h1>
      <Col sm={{ span: 8, offset: 2 }}>
        <Form onSubmit={handleSubmit} noValidate>
          <TextInput
            label='username'
            type='text'
            name='username'
            onChange={handleChange}
            value={username}
            placeholder='Enter your user name'
            error={errors.username}
          />
          <TextInput
            label='email'
            type='email'
            name='email'
            onChange={handleChange}
            value={email}
            placeholder='Enter your email'
            error={errors.email}
          />

          <TextInput
            label='password'
            type='password'
            name='password'
            onChange={handleChange}
            value={password}
            placeholder='Enter your password'
            error={errors.password}
          />

          <TextInput
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            onChange={handleChange}
            value={confirmPassword}
            placeholder='Enter your confirm password'
            error={errors.confirmPassword}
          />

          <div className='mt-4'>
            <Button variant='primary' size='md' className='me-3' type='submit'>
              Register
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
