import { Form, Row, Col } from 'react-bootstrap'

const CheckInput = ({ name, label, value, onChange, valueToCheck }) => {
  return (
    <Col sm='auto'>
      <Form.Check
        type='radio'
        onChange={onChange}
        name={name}
        value={value}
        label={label}
        checked={valueToCheck === value}
      />
    </Col>
  )
}

export default CheckInput
