const formatIssues = (data) => {
  return data.map((issue) => ({ id: issue.id, ...issue.attributes }))
}

export default formatIssues
