import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import App from './components/App';
import Store from './store';
import './stylesheet/index.css';
import 'materialize-css/bin/materialize.css';

const initState = loadState();
const store = Store(initState);

store.subscribe(() => {
    saveState(store.getState().todos);
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
