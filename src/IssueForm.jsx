import { Col, Form, Row, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
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

const IssueForm = ({ addIssue, updateIssue, issue: issueToEdit }) => {
  const [issue, setIssue] = useState({
    title: '',
    subTitle: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
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

    if (issue.id && isValid) {
      updateIssue({
        ...issue,
      })
      toast.success('Issue is Updated successfully')
      return navigate('/issues')
    }

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
      <h1 className='mb-4 mt-4'> {issueToEdit ? 'Edit Issue' : 'Add Issue'}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='title' column>
              Title
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              type='text'
              name='title'
              id='title'
              onChange={handleChange}
              value={title}
              placeholder='Enter your Task Name'
              isInvalid={errorTitle}
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errorTitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='title' column>
              Sub Title
            </Form.Label>
          </Col>
          <Col sm={9}>
            <Form.Control
              as='textarea'
              name='subTitle'
              id='subTitle'
              onChange={handleChange}
              value={subTitle}
              placeholder='Enter your Task Details'
              isInvalid={errorSubTitle}
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errorSubTitle}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col xs={3}>
            <Form.Label htmlFor='title' column>
              Assigned To{' '}
            </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type='text'
              onChange={handleChange}
              name='assignedTo'
              value={assignedTo}
              isInvalid={errorAssignedTo}
              placeholder='Enter name whom you have assigned to'
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errorAssignedTo}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Col sm={3}>
            <Form.Label htmlFor='startDate' column>
              Start Date
            </Form.Label>
          </Col>
          <Col sm={3}>
            <Form.Control
              type='date'
              onChange={handleChange}
              name='startDate'
              value={startDate}
              placeholder='Enter Start Date'
              isInvalid={errorStartDate}
            />
            <Form.Control.Feedback type='invalid' className='d-block'>
              {errorStartDate}
            </Form.Control.Feedback>
          </Col>

          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <Form.Label htmlFor='endDate' column>
                  End Date
                </Form.Label>
              </Col>
              <Col sm={9}>
                <Form.Control
                  type='date'
                  onChange={handleChange}
                  name='endDate'
                  value={endDate}
                  placeholder='Enter End Date'
                  isInvalid={errorEndDate}
                />
                <Form.Control.Feedback type='invalid' className='d-block'>
                  {errorStartDate}
                </Form.Control.Feedback>
              </Col>
            </Row>
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
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='priority'
                value='high'
                label='High'
                checked={priority === 'high'}
              />
            </Col>
            <Col xs='auto'>
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='priority'
                label='Medium'
                value='medium'
                checked={priority === 'medium'}
              />
            </Col>
            <Col xs='auto'>
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='priority'
                label='Low'
                value='low'
                checked={priority === 'low'}
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
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='status'
                label='New'
                value='new'
                checked={status === 'new'}
              />
            </Col>
            <Col xs='auto'>
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='status'
                label='In Progress'
                value='inProgress'
                checked={status === 'inProgress'}
              />
            </Col>
            <Col xs='auto'>
              <Form.Check
                type='radio'
                onChange={handleChange}
                name='status'
                label='Completed'
                value='completed'
                checked={status === 'completed'}
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
