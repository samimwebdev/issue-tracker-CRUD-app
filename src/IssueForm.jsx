import { useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'
import TextInput from './formInputs/TextInput'
import DateInput from './formInputs/DateInput'
import RadioInput from './formInputs/RadioInput'
import 'react-datepicker/dist/react-datepicker.css'

const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const [issue, setIssue] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: new Date(),
    endDate: null,
    priority: 'low',
    status: 'new',
    completedPercentage: 1,
  })
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

  const navigate = useNavigate()

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
    console.log(isValid, issue.id)

    if (issue.id && isValid) {
      updateIssue({
        ...issue,
      })
      toast.success('Issue is Updated successfully')
      return navigate('/issues')
    }
    if (isValid) {
      console.log(typeof issue.startDate)
      console.log(typeof issue.endDate)
      //form submission
      addIssue({
        id: uuid(),
        ...issue,
      })
      toast.success('Issue is added successfully')
      // navigate('/issues')
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

  return (
    <>
      <h1 className='mb-4 mt-4'>{issueToEdit ? 'Edit issue' : 'Add Issue'}</h1>
      <Form onSubmit={handleSubmit}>
        <TextInput
          label='title'
          text='Title'
          value={title}
          handleChange={handleChange}
          errorLabel={errorTitle}
          placeholder='Please Enter Task Title'
        />

        <TextInput
          label='subTitle'
          text='Sub Title'
          value={subTitle}
          handleChange={handleChange}
          errorLabel={errorSubTitle}
          inputType='textarea'
          placeholder='Please Enter Task Details'
        />

        <TextInput
          label='assignedTo'
          text='Assigned To'
          value={assignedTo}
          handleChange={handleChange}
          errorLabel={errorAssignedTo}
          placeholder='Please Assign the task to a person'
        />

        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='startDate' column>
              Start Date
            </Form.Label>
          </Col>
          <Col sm={3}>
            <DateInput
              name='startDate'
              onChange={(date) => setIssue({ ...issue, startDate: date })}
              placeholder='Enter Start Date'
              value={startDate}
              error={errorStartDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              selectsStart
            />
          </Col>
          <Col sm={2}>
            <Form.Label htmlFor='endDate' column className='text-center'>
              End Date
            </Form.Label>
          </Col>
          <Col sm={4}>
            <DateInput
              name='endDate'
              onChange={(date) => setIssue({ ...issue, endDate: date })}
              startDate={startDate}
              value={endDate}
              endDate={endDate}
              minDate={startDate}
              placeholder='Enter End Date'
              error={errorEndDate}
              selectsEnd
            />
          </Col>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Row>
            <Col sm={3}>
              <Form.Label htmlFor='priority' column>
                priority{' '}
              </Form.Label>
            </Col>

            <Col sm='auto'>
              <RadioInput
                onChange={handleChange}
                name='priority'
                value='high'
                label='High'
                valueToCheck={priority}
              />
            </Col>
            <Col xs='auto'>
              <RadioInput
                onChange={handleChange}
                name='priority'
                value='medium'
                label='Medium'
                valueToCheck={priority}
              />
            </Col>
            <Col xs='auto'>
              <RadioInput
                onChange={handleChange}
                name='priority'
                value='low'
                label='Low'
                valueToCheck={priority}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className='mb-3'>
          <Row>
            <Col xs={3}>
              <Form.Label htmlFor='status' column>
                Status{' '}
              </Form.Label>
            </Col>

            <Col xs='auto'>
              <RadioInput
                onChange={handleChange}
                name='status'
                value='new'
                label='New'
                valueToCheck={status}
              />
            </Col>
            <Col xs='auto'>
              <RadioInput
                onChange={handleChange}
                name='status'
                value='inProgress'
                label='In Progress'
                valueToCheck={status}
              />
            </Col>
            <Col xs='auto'>
              <RadioInput
                onChange={handleChange}
                name='status'
                value='completed'
                label='Completed'
                valueToCheck={status}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col xs={3}>
              <Form.Label htmlFor='completedPercentage' column>
                Completed In percentage{' '}
              </Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Range
                value={completedPercentage}
                name='completedPercentage'
                onChange={handleChange}
              />
            </Col>
            <Col xs={1}>{completedPercentage}</Col>
          </Row>
        </Form.Group>
        <Button variant='primary' size='md' type='submit'>
          {issueToEdit ? 'Update issue' : 'Submit Issue'}
        </Button>
      </Form>
    </>
  )
}

export default IssueForm
