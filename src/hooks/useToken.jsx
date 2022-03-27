import { useState, useEffect } from 'react'

const useToken = () => {
  const [token, setToken] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const loadToken = () => {
    const token = localStorage.getItem('issue-tracker-token')
    setToken(token)
    setLoaded(true)
  }
  useEffect(() => {
    loadToken()
  }, [])

  return { token, loaded }
}

export default useToken
