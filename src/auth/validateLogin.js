export default function validateLogin(values) {
  const { email, password } = values
  let errors = {}
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i
  if (email === '' || !regex.test(email)) {
    errors.email = 'Email is Required and must be valid'
  }

  if (password === '') {
    errors.password = 'password is Required '
  }

  return errors
}
