const formatIssues = (data) => {
  console.log(data)
  return data.map((issue) => ({ id: issue.id, ...issue.attributes }))
}

export default formatIssues
