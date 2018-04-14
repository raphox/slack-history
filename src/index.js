import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App/App';
import { Provider } from 'react-redux';

import registerServiceWorker from 'registerServiceWorker';

import configureStore from 'configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
