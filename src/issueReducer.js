import {
  ADD_ISSUE,
  DELETE_ISSUE,
  UPDATE_ISSUE,
  COMPLETE_ISSUE,
} from './actions'

export const issueReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_ISSUE:
      return [...state, payload]
    case DELETE_ISSUE:
      const issuesAfterDelete = state.filter((issue) => issue.id !== payload)
      return [...issuesAfterDelete]
    case UPDATE_ISSUE:
      const issuesAfterUpdate = state.map((issue) => {
        if (issue.id === payload.id) {
          return {
            ...payload,
            id: issue.id,
            status:
              parseInt(payload.completedPercentage) < 100
                ? payload.status
                : 'completed',
          }
        } else {
          return issue
        }
      })

      return [...issuesAfterUpdate]
    case COMPLETE_ISSUE:
      const issuesAfterCompletion = state.map((issue) => {
        if (issue.id === payload) {
          return {
            ...issue,
            status: 'completed',
            completedPercentage: 100,
          }
        } else {
          return issue
        }
      })

      return [...issuesAfterCompletion]

    default:
      return state
  }
}
