import { createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  //   const register = (userInfo) => {
  //     console.log(userInfo)
  //   }
  //   const login = (userInfo) => {
  //     console.log(userInfo)
  //   }

  const value = {
    register,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
