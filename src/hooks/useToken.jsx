import { useEffect, useState } from 'react'

const useToken = () => {
  const [token, setToken] = useState(null)

  const loadToken = () => {
    const token = localStorage.getItem('issue-tracker-token')
    if (token) {
      setToken(token)
    }
  }

  useEffect(() => {
    loadToken()
  }, [])

  return token
}

export default useToken
