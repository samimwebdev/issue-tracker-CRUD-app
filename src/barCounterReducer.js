import {
  ADD_ISSUE_COUNTER,
  DELETE_ISSUE_COUNTER,
  UPDATE_ISSUE_COUNTER,
} from './actions'

export const barCounterReducer = (state, action) => {
  const { payload, type } = action

  switch (type) {
    case ADD_ISSUE_COUNTER:
      return {
        totalCount: state.totalCount + 1,
        newCount:
          payload.status === 'new' ? state.newCount + 1 : state.newCount,
        progressCount:
          payload.status === 'inProgress'
            ? state.progressCount + 1
            : state.progressCount,
        completedCount:
          payload.status === 'completed'
            ? state.completedCount + 1
            : state.completedCount,
      }
    case UPDATE_ISSUE_COUNTER:
      const isIssueStatusSame = payload.existingIssueStatus === payload.status

      if (isIssueStatusSame) {
        return {
          ...state,
        }
      } else {
        return {
          ...state,
          newCount:
            payload.existingIssueStatus === 'new'
              ? state.newCount - 1
              : payload.status === 'new'
              ? state.newCount + 1
              : state.newCount,

          progressCount:
            payload.existingIssueStatus === 'inProgress'
              ? state.progressCount - 1
              : payload.status === 'inProgress'
              ? state.progressCount + 1
              : state.progressCount,
          completedCount:
            payload.existingIssueStatus === 'completed'
              ? state.completedCount - 1
              : payload.status === 'completed'
              ? state.completedCount + 1
              : state.completedCount,
        }
      }
    case DELETE_ISSUE_COUNTER:
      return {
        ...state,
        newCount:
          payload.status === 'new' ? state.newCount - 1 : state.newCount,
        progressCount:
          payload.status === 'inProgress'
            ? state.progressCount - 1
            : state.progressCount,
        completedCount:
          payload.status === 'completed'
            ? state.completedCount - 1
            : state.completedCount,
      }

    default:
      return state
  }
}
