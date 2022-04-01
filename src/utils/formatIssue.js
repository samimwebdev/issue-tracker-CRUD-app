const formatIssue = (data) => {
  return {
    id: data.id,
    ...data.attributes,
  }
}

export default formatIssue
