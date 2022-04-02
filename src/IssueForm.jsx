import { Col, Form, Row, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

import DatePicker from 'react-datepicker'
import { addDays } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import TextInput from './formInputs/TextInput'
import DateInput from './formInputs/DateInput'
import CommonCheckInput from './formInputs/CommonCheckInput'
import axiosAPI from './utils/axiosAPI'
import useToken from './hooks/useToken'
import SelectInput from './formInputs/SelectInput'

const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const [issue, setIssue] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    priority: 'low',
    status: 'new',
    completedPercentage: 1,
  })
  const [users, setUsers] = useState(null)
  const { token, tokenLoaded } = useToken()

  const loadUsers = async () => {
    const data = await axiosAPI({
      method: 'get',
      url: '/users',
      config: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const users = data.map((user) => ({ id: user.id, username: user.username }))
    setUsers(users)
  }

  useEffect(() => {
    if (tokenLoaded && token) {
      loadUsers()
    }
  }, [tokenLoaded, token])

  useEffect(() => {
    if (issueToEdit) {
      const {
        id,
        title,
        subTitle,
        assignedTo,
        startDate,
        endDate,
        priority,
        status,
        completedPercentage,
      } = issueToEdit

      setIssue({
        id,
        title,
        subTitle,
        assignedTo,
        startDate,
        endDate,
        priority,
        status,
        completedPercentage,
      })
    }
  }, [issueToEdit])

  const [errors, setErrors] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (evt) => {
    setIssue({
      ...issue,
      [evt.target.name]: evt.target.value,
    })

    setErrors({
      ...errors,
      [evt.target.name]: '',
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { title, subTitle, assignedTo, startDate, endDate } = issue
    //checking error
    if (title === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: 'Title is Required',
      }))
    }

    if (subTitle === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        subTitle: 'SubTitle is Required',
      }))
    }

    if (assignedTo === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        assignedTo: 'Assigned to a person is Required',
      }))
    }
    if (startDate === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        startDate: 'Start Date is Required',
      }))
    }

    if (endDate === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        endDate: 'End Date is Required',
      }))
    }
    // return true if every element is true, otherwise False
    const isValid = Object.values(issue).every((elm) => elm)

    if (issue.id && isValid) {
      updateIssue({
        ...issue,
      })
    }

    if (isValid && !issue.id) {
      //form submission
      addIssue({
        ...issue,
      })
      //reset the form
      // setIssue(defaultIssue)
    }
  }

  const {
    title,
    subTitle,
    assignedTo,
    startDate,
    endDate,
    priority,
    status,
    completedPercentage,
  } = issue
  const {
    title: errorTitle,
    subTitle: errorSubTitle,
    assignedTo: errorAssignedTo,
    startDate: errorStartDate,
    endDate: errorEndDate,
  } = errors

  const statusValues = [
    {
      name: 'status',
      label: 'New',
      value: 'new',
      valueToCheck: status,
    },
    {
      name: 'status',
      label: 'In Progress',
      value: 'inProgress',
      valueToCheck: status,
    },
    {
      name: 'status',
      label: 'Completed',
      value: 'completed',
      valueToCheck: status,
    },
  ]

  const priorityValues = [
    {
      name: 'priority',
      label: 'High',
      value: 'high',
      valueToCheck: priority,
    },
    {
      name: 'priority',
      label: 'Medium',
      value: 'medium',
      valueToCheck: priority,
    },
    {
      name: 'priority',
      label: 'Low',
      value: 'low',
      valueToCheck: priority,
    },
  ]

  return (
    <>
      <h1 className='mb-4 mt-4'> {issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
      <Form onSubmit={handleSubmit}>
        <TextInput
          label='Title'
          type='text'
          name='title'
          onChange={handleChange}
          value={title}
          placeholder='Enter your Task Name'
          error={errorTitle}
        />
        <TextInput
          label='Sub Title'
          type='text'
          name='subTitle'
          onChange={handleChange}
          value={subTitle}
          placeholder='Enter your Task Details'
          error={errorSubTitle}
          as='textarea'
        />
        <SelectInput
          label='Assigned To'
          name='assignedTo'
          onChange={handleChange}
          value={assignedTo}
          error={errorAssignedTo}
          users={users}
        />

        {/* <TextInput
          label='Assigned To'
          type='text'
          name='assignedTo'
          onChange={handleChange}
          value={assignedTo}
          placeholder='Enter name whom you have assigned to'
          
        /> */}
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='startDate' column>
              Start Date
            </Form.Label>
          </Col>
          <Col sm={3}>
            <DateInput
              selected={startDate}
              onChange={(date) =>
                setIssue({
                  ...issue,
                  startDate: date,
                })
              }
              name='startDate'
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              value={startDate}
              error={errorStartDate}
              selectsStart
            />
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label htmlFor='endDate' column>
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <DateInput
                  selected={endDate}
                  onChange={(date) =>
                    setIssue({
                      ...issue,
                      endDate: date,
                    })
                  }
                  name='endDate'
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  value={endDate}
                  error={errorEndDate}
                  selectsEnd
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>
        <CommonCheckInput
          label='priority'
          onChange={handleChange}
          valueToIterate={priorityValues}
        />
        <CommonCheckInput
          label='status'
          onChange={handleChange}
          valueToIterate={statusValues}
        />

        <Form.Group>
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor='completedPercentage' column>
                Completed In percentage{' '}
              </Form.Label>
            </Col>
            <Col sm={4}>
              <Form.Range
                value={completedPercentage}
                name='completedPercentage'
                onChange={handleChange}
              />
            </Col>
            <Col sm={1}>{completedPercentage}</Col>
          </Row>
        </Form.Group>
        <div className='mt-4'>
          <Button variant='primary' size='md' className='me-3' type='submit'>
            {issueToEdit ? 'Update Issue' : 'Submit Issue'}
          </Button>
        </div>
      </Form>
    </>
  )
}

export default IssueForm
