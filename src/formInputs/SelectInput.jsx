import { Form, Row, Col } from 'react-bootstrap'

<<<<<<< HEAD
const SelectInput = ({ label, users, name, onChange, value, error }) => {
=======
const SelectInput = ({ label, name, onChange, value, error, users }) => {
>>>>>>> edit-update-complete
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
<<<<<<< HEAD
          <option value=''>Selected the user you want to assigned to</option>
          {users &&
            users.map((user) => (
              <option value={user.id} key={user.id}>
=======
          <option value=''>Name the person you want assigned to</option>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
>>>>>>> edit-update-complete
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
