import { Form, Col, Row } from 'react-bootstrap'
import CheckInput from './CheckInput'

const CommonCheckInput = ({ label, valueToIterate, onChange }) => {
  return (
    <Form.Group className='mb-3'>
      <Row>
        <Col sm={3}>
          <Form.Label htmlFor='priority' column>
            {label}
          </Form.Label>
        </Col>
        {valueToIterate.map((elm, index) => (
          <CheckInput
            key={index}
            name={elm.name}
            label={elm.label}
            value={elm.value}
            onChange={onChange}
            valueToCheck={elm.valueToCheck}
          />
        ))}
      </Row>
    </Form.Group>
  )
}

export default CommonCheckInput
