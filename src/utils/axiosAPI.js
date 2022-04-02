import axios from 'axios'

const isProduction = import.meta.env.PROD
const axiosInstance = axios.create({
  baseURL: isProduction
    ? import.meta.env.VITE_PROODUCTION_URL
    : import.meta.env.VITE_DEVELOPMENT_URL,
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
