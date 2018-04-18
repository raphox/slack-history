import { combineReducers } from 'redux';
import elasticlunr from 'elasticlunr';
import {
  SELECT_SESSION,
  INVALIDATE_SESSION,
  REQUEST_SESSION,
  RECEIVE_SESSION,
  FILTER_SESSION_MESSAGES
} from './actions'

function selectedSession(state = '', action) {
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
    data: {},
    index: null
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
      const index = elasticlunr(function () {
        this.addField('username');
        this.addField('message');
        this.setRef('id');
      });

      index.addDoc({
        id: action.session.id,
        username: action.session.username,
        message: action.session.msg,
      });

      for (let message of action.session.messages) {
        index.addDoc({
          id: message.id,
          username: message.username,
          message: message.msg,
        });
      }

      return { ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.session,
        index: index,
        lastUpdated: action.receivedAt
      };
    case FILTER_SESSION_MESSAGES:
      if (!action.str || !action.session) return state;

      let session = { ...action.session };
      let founds = action.index.search(action.str);

      session.resultSearch = session.messages.filter((i) => founds.filter((j) => j.ref === i.id).length > 0);

      return { ...state,
        data: session,
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
    case FILTER_SESSION_MESSAGES:
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
