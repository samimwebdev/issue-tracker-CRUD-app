import { Col, Form, Row } from 'react-bootstrap'

const DateInput = ({ name, onChange, error, value, placeholder }) => {
  return (
    <>
      <Form.Control
        type='date'
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={error}
      />
      <Form.Control.Feedback type='invalid' className='d-block'>
        {error}
      </Form.Control.Feedback>
    </>
  )
}

export default DateInput
