import { useState, useEffect } from 'react'

const useIssueAPI = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) //different!
  const [controller, setController] = useState(null)

  const handleIssueAPI = async (configObj) => {
    const {
      axiosInstance,
      method,
      url,
      data = {},
      requestConfig = {},
    } = configObj
    console.log(requestConfig)
    console.log(data)

    try {
      setLoading(true)
      const ctrl = new AbortController()
      setController(ctrl)
      const res = await axiosInstance(url, {
        method,
        data,
        signal: ctrl.signal,
        ...requestConfig,
      })

      return res.data
    } catch (err) {
      console.log(err.response)
      setError(err.response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;() => {
      return controller && controller.abort()
    }
  })

  async function addIssues(config) {
    try {
      const { axiosInstance, method, url, data: formattedData, token } = config
      const inspectConfig = {
        url: url,
        method: method,
        data: {
          data: formattedData,
        },
      }
      console.log(inspectConfig)
      const response = await axiosInstance(inspectConfig)
      console.log(response.data)
      return response.data
    } catch (err) {
      console.log(err.response)
    }
  }

  //   useEffect(() => {
  //     // useEffect cleanup function
  //     return () => controller && controller.abort()
  //   }, [controller])

  return [error, loading, handleIssueAPI, addIssues]
}

export default useIssueAPI
