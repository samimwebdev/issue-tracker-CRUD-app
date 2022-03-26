export const formateIssues = (issues) => {
  return issues.map((issue) => ({
    id: issue.id,
    ...issue.attributes,
  }))
}

export const formateIssue = (issue) => {
  return {
    id: issue.id,
    ...issue.attributes,
  }
}
