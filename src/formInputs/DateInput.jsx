import { Col, Form, Row } from 'react-bootstrap'

import DatePicker from 'react-datepicker'
const DateInput = ({
  name,
  onChange,
  error,
  value,
  startDate,
  endDate,
  minDate,
  placeholder,
  ...rest
}) => {
  console.log(rest)
  return (
    <>
      <DatePicker
        type='date'
        name={name}
        id={name}
        selected={value}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        onChange={onChange}
        placeholder={placeholder}
        isInvalid={error}
        {...rest}
      />
      <Form.Control.Feedback type='invalid' className='d-block'>
        {error}
      </Form.Control.Feedback>
    </>
  )
}

export default DateInput
