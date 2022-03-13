import { Col, Form, Row } from 'react-bootstrap'

const TextInput = ({
  label,
  text,
  handleChange,
  errorLabel,
  value,
  placeholder,
  inputType,
}) => {
  return (
    <Form.Group as={Row} className='mb-3'>
      <Col sm={3}>
        <Form.Label htmlFor={label} column>
          {text}
        </Form.Label>
      </Col>
      <Col sm={9}>
        <Form.Control
          type='text'
          as={inputType && inputType}
          name={label}
          id={label}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
          isInvalid={errorLabel}
        />
        <Form.Control.Feedback type='invalid' className='d-block'>
          {errorLabel}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

export default TextInput
