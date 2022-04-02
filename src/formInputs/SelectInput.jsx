import { Form, Row, Col } from 'react-bootstrap'

const SelectInput = ({ label, users, name, onChange, value, error }) => {
  return (
    <Form.Group as={Row} className='mb-3'>
      <Col sm={3}>
        <Form.Label htmlFor={name} column>
          {label}
        </Form.Label>
      </Col>
      <Col sm={9}>
        <Form.Select
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          isInvalid={error}
        >
          <option value=''>Selected the user you want to assigned to</option>
          {users &&
            users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
        </Form.Select>
        <Form.Control.Feedback type='invalid' className='d-block'>
          {error}
        </Form.Control.Feedback>
      </Col>
    </Form.Group>
  )
}

export default SelectInput
