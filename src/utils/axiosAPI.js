import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:1337/api/',
})

const axiosAPI = async ({ method, url, data, config = {} }) => {
  const res = await axiosInstance({
    method,
    url,
    data,
    ...config,
  })
  return res.data
}

export default axiosAPI
