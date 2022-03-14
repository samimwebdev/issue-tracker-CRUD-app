import { Form, Row, Col } from 'react-bootstrap'

const TextInput = ({
  label,
  type,
  name,
  onChange,
  value,
  placeholder,
  error,
  ...rest
}) => {
  return (
    <Form.Group as={Row} className='mb-3'>
      <Col sm={3}>
        <Form.Label htmlFor={name} column>
          {label}
        </Form.Label>
      </Col>
      <Col sm={9}>
        <Form.Control
          type={type}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          isInvalid={error}
          {...rest}
        />
        <Form.Control.Feedback type='invalid' className='d-block'>
          {error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

export default TextInput
