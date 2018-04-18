import fetch from 'cross-fetch';

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

export function filterSessionMessages(title, session, str, index) {
  return {
    type: FILTER_SESSION_MESSAGES,
    title,
    session,
    str,
    index
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
    session,
    receivedAt: Date.now()
  };
}

function fetchSession(title) {
  return dispatch => {
    if (!title) return null;

    dispatch(requestSession(title));

    return fetch(`${process.env.PUBLIC_URL}/sessions/${title}.json`)
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

export function fetchSessionIfNeeded(title) {
  return (dispatch, getState) => {
    if (shouldFetchSession(getState(), title)) {
      return dispatch(fetchSession(title));
    }
  }
};
