export default function validateRegister(values) {
  const { username, email, password, confirmPassword } = values
  let errors = {}
  //checking error
  if (username === '') {
    errors.username = 'username is Required'
  }
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i
  if (email === '' || !regex.test(email)) {
    errors.email = 'Email is Required and must be valid'
  }

  if (password === '' || password.length < 6) {
    errors.password =
      'password is Required and must be More that 6 character in length'
  }

  if (confirmPassword === '' || password !== confirmPassword) {
    errors.confirmPassword =
      'Confirm Password is Required and must match password'
  }
  return errors
}
