import { useState, useRef } from 'react'

const info = {
  firstName: '',
  lastName: '',
  age: '',
  profession: 'developer',
  gender: 'male',
}

//uncontrolled component

function App() {
  const firstNameRef = useRef(null)
  const [userInfo, setUserInfo] = useState(info)

  const [errorInfo, setErrorInfo] = useState({
    firstName: '',
    lastName: '',
    age: '',
  })

  const handleChange = (evt) => {
    setUserInfo({
      ...userInfo,
      [evt.target.name]: evt.target.value,
    })

    setErrorInfo({
      ...errorInfo,
      [evt.target.name]: '',
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { firstName, lastName, age, profession, gender } = userInfo

    //validation part
    // if (firstName === '' || lastName === '' || age === '') {
    //   setErrorInfo('Please provide necessary Information')
    //   return
    // }
    if (firstName === '') {
      setErrorInfo((prevState) => {
        return {
          ...prevState,
          firstName: 'Please provide FirstName',
        }
      })
    }

    if (lastName === '') {
      setErrorInfo((prevState) => {
        console.log(prevState)
        return {
          ...prevState,
          lastName: 'Please provide lastName',
        }
      })
    }

    if (age === '') {
      setErrorInfo((prevState) => {
        return {
          ...prevState,
          age: 'Please provide Age',
        }
      })
    }

    //check every field (value) of userInfo obj , if every filed is true result will be true(valid) otherwise false(if any values is false)
    const isValid = Object.values(userInfo).every((elm) => elm)

    //incase valid is true  form will be submitted
    if (isValid) {
      // if(errorInfo.values())
      console.log('submitting')
      firstNameRef.current.focus()

      console.log(userInfo)
      //reset user Info
      setUserInfo(info)
    }
  }

  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  // console.log(firstName)
  const { firstName, lastName, age, profession, gender } = userInfo
  console.log(firstName === '')
  return (
    <>
      {/* {errorInfo && errorInfo} */}
      <form onSubmit={handleSubmit}>
        <h1>Forms with React</h1>
        <div className='form-group'>
          {errorInfo.firstName && errorInfo.firstName}
          <br />
          <label htmlFor='firstName'>First Name:</label>
          <input
            type='text'
            onChange={handleChange}
            name='firstName'
            ref={firstNameRef}
            value={firstName}
            id='firstName'
          />
        </div>
        <br />
        <div className='form-group'>
          {errorInfo.lastName && errorInfo.lastName}
          <br />
          <label htmlFor='lastName'>Last Name:</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            id='lastName'
          />
        </div>

        <div className='form-group'>
          {errorInfo.age && errorInfo.age}
          <br />
          <label htmlFor='age'>Age:</label>
          <input
            type='number'
            name='age'
            value={age}
            onChange={handleChange}
            id='age'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='profession'>Profession: </label>
          <select
            id='profession'
            name='profession'
            onChange={handleChange}
            value={profession}
          >
            <option value='developer'>Developer</option>
            <option value='designer'>Designer</option>
            <option value='programmer'>Programmer</option>
          </select>
        </div>

        <div>
          <label htmlFor='gender'>Gender: </label>
          Male{' '}
          <input
            type='radio'
            name='gender'
            value='male'
            checked={gender === 'male'}
            onChange={handleChange}
          />
          Female{' '}
          <input
            type='radio'
            name='gender'
            value='female'
            checked={gender === 'female'}
            onChange={handleChange}
          />
        </div>
        <input type='submit' value='submit' />
      </form>
    </>
  )
}

export default App
