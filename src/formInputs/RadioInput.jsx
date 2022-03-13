import { Col, Form } from 'react-bootstrap'

const RadioInput = ({ name, onChange, label, value, valueToCheck }) => {
  return (
    <Form.Check
      type='radio'
      onChange={onChange}
      name={name}
      value={value}
      label={label}
      checked={valueToCheck === value}
    />
  )
}

export default RadioInput
