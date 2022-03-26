import axios from 'axios'

function fetchToken() {
  const obj = {}
  return () => {
    if (!obj.token) {
      console.log('fetching token from localStorage')
      const token = localStorage.getItem('issue-tracker-token')
      obj.token = token
      return obj.token
    }
    console.log('Token from cache')
    return obj.token
  }
}

const getToken = fetchToken()

export const publicAPIInstance = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export const privateAPIInstance = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
})
