import { combineReducers } from 'redux'
import {
  SELECT_SESSION,
  INVALIDATE_SESSION,
  REQUEST_SESSION,
  RECEIVE_SESSION
} from './actions'

function selectedSession(state = 'dan-abramov-201804', action) {
  switch (action.type) {
    case SELECT_SESSION:
      return action.title
    default:
      return state
  }
}

function sessions(
  state = {
    isFetching: false,
    didInvalidate: false,
    data: {}
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SESSION:
      return { ...state,
        didInvalidate: true
      };
    case REQUEST_SESSION:
      return { ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_SESSION:
      return { ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.session,
        lastUpdated: action.receivedAt
      };
    default:
      return state
  }
}

function sessionByTitle(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SESSION:
    case RECEIVE_SESSION:
    case REQUEST_SESSION:
      return { ...state,
        [action.title]: sessions(state[action.title], action)
      };
    default:
      return state
  }
}

const rootReducer = combineReducers({
  sessionByTitle,
  selectedSession
})

export default rootReducer
