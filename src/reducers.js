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
        this.addField('msg');
        this.addField('highlights');
        this.setRef('id');
      });

      for (let message of action.session.messages) {
        const maxlenght = 100;

        let msg = (message.msg.length > maxlenght) ? message.msg.substr(0, maxlenght-1) + '&hellip;' : message.msg;
        index.addDoc({...message, msg});

        for (let answer of message.messages) {
          let msg = (answer.msg.length > maxlenght) ? answer.msg.substr(0, maxlenght-1) + '&hellip;' : answer.msg;
          index.addDoc({...answer, msg});
        }
      }

      return { ...state,
        isFetching: false,
        didInvalidate: false,
        data: action.session,
        index: index,
        lastUpdated: action.receivedAt
      };
    case FILTER_SESSION_MESSAGES:
      if (!action.index) return state;

      let session = { ...action.session };
      const founds = action.str ? action.index.search(action.str) : [];
      const docs = action.index.documentStore.docs;

      // filter messages by ID from index search and convert `Object` to `Array`
      session.resultSearch = Object.keys(docs).filter((i) => {
        const item = docs[i];
        return founds.filter((j) => j.ref === item.id).length > 0
      }).reduce((collection, key) => {
        collection.push(docs[key]);
        return collection;
      }, []);

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
