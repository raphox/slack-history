import fetch from 'cross-fetch';
import elasticlunr from 'elasticlunr';

export const REQUEST_SESSION = 'REQUEST_SESSION';
export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export const SELECT_SESSION = 'SELECT_SESSION';
export const INVALIDATE_SESSION = 'INVALIDATE_SESSION';
export const FILTER_SESSION_MESSAGES = 'FILTER_SESSION_MESSAGES';

export function selectSession(title) {
  return {
    type: SELECT_SESSION,
    title
  };
};

export function invalidateSession(title) {
  return {
    type: INVALIDATE_SESSION,
    title
  };
};

export function filterSessionMessages(title, session) {
  return {
    type: FILTER_SESSION_MESSAGES,
    title,
    session: { ...session },
  }
}

function requestSession(title) {
  return {
    type: REQUEST_SESSION,
    title
  };
}

function receiveSession(title, session) {
  return {
    type: RECEIVE_SESSION,
    title,
    session: { ...session },
    index: generateIndex(session.messages),
    receivedAt: Date.now()
  };
}

function fetchSession(title, session) {
  return dispatch => {
    if (!title) return null;

    dispatch(requestSession(title));

    return fetch(`${process.env.PUBLIC_URL}/data/${session}/${title}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveSession(title, json)));
  };
}

function shouldFetchSession(state, title) {
  const sessions = state.sessionByTitle[title];

  if (!sessions) {
    return true;
  } else if (sessions.isFetching) {
    return false;
  } else {
    return sessions.didInvalidate;
  }
}

function generateIndex(messages) {
  const index = elasticlunr(function () {
    this.addField('username');
    this.addField('msg');
    this.addField('highlights');
    this.setRef('id');
  });

  for (let message of messages) {
    index.addDoc({...message});

    for (let answer of message.messages) {
      index.addDoc({...answer});
    }
  }

  return index;
}

export function fetchSessionIfNeeded(title, session) {
  return (dispatch, getState) => {
    if (shouldFetchSession(getState(), title)) {
      return dispatch(fetchSession(title, session));
    }
  }
};
