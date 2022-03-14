import { useEffect, useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TextInput from '../formInputs/TextInput'
import DateInput from '../formInputs/DateInput'
import RadioInput from '../formInputs/RadioInput'

const defaultIssue = {
  title: '',
  subTitle: '',
  assignedTo: '',
  startDate: '',
  endDate: '',
  priority: 'low',
  status: 'new',
  completedPercentage: 1,
}

const AddIssue = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const [issue, setIssue] = useState(defaultIssue)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(issueToEdit)
    setIssue(issueToEdit)
  }, [issueToEdit])
  console.log(issueToEdit)

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
    console.log('calling...')
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
    console.log(isValid)

    if (isValid) {
      //form submission
      addIssue({
        id: uuid(),
        ...issue,
      })
      toast.success('Issue is added successfully')
      navigate('/issues')
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
      <h1 className='mb-4 mt-4'>{issue.id ? 'Edit issue' : 'Add Issue'}</h1>
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
              onChange={handleChange}
              value={startDate}
              placeholder='Enter Start Date'
              error={errorStartDate}
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
              onChange={handleChange}
              value={endDate}
              placeholder='Enter End Date'
              error={errorEndDate}
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
          {issue.id ? 'Update issue' : 'Submit Issue'}
        </Button>
      </Form>
    </>
  )
}

export default AddIssue
