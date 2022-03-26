import { useState } from 'react'

const useFormValidate = (initialState, validate, authenticate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState(null)

  const handleChange = (evt) => {
    evt.persist()
    setValues((prevValues) => ({
      ...prevValues,
      [evt.target.name]: evt.target.value,
    }))

    setErrors((prevErrors) => ({
      ...prevErrors,
      [evt.target.name]: '',
    }))
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const validationErrors = validate(values)

    setErrors(validationErrors)
    // return true if every element is true, otherwise False
    const isValid = Object.keys(validationErrors).length === 0
    if (isValid) {
      await authenticate()
    }
  }

  return {
    handleChange,
    values,
    errors,
    handleSubmit,
  }
}

export default useFormValidate
