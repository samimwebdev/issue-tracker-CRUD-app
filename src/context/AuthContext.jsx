import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userLoaded, setUserLoaded] = useState(false)

  async function loadUser() {
    try {
      const authToken = localStorage.getItem('issue-tracker-token')
      if (authToken) {
        const res = await axios.get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        const { id, username, email } = res.data
        setUser({ id, username, email })
      }
    } catch (err) {
      console.log(err)
      setUser(null)
    } finally {
      setUserLoaded(true)
    }
  }

  useEffect(() => {
    ;(async function () {
      await loadUser()
    })()
  }, [])

  const saveAuthInfo = (userInfo) => {
    //save token to localStorage
    localStorage.setItem('issue-tracker-token', userInfo.jwt)
    console.log(userInfo)
    // saving user to state
    const { id, name, email } = userInfo.user
    setUser({ id, name, email })
  }

  const removeAuthInfo = () => {
    //save token to localStorage
    const token = localStorage.getItem('issue-tracker-token')
    if (token) {
      localStorage.removeItem('issue-tracker-token')
      setUser(null)
    }
  }

  const value = {
    userLoaded,
    saveAuthInfo,
    removeAuthInfo,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
