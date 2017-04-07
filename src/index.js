import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadState, saveState } from './localStorage';
import App from './components/App';
import Details from './components/containers/Details';
import TodoList from './components/containers/TodoList';
import Store from './store';
import './stylesheet/index.css';
import 'materialize-css';
import 'materialize-css/bin/materialize.css';

const initState = loadState();
const store = Store(initState);

// TODO: save only todos in ls not complete store
store.subscribe(() => {
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" render={() => {
                    return <App><TodoList /></App>;
                }} />
                <Route exact path="/details/:id" render={(props) => {
                    return <App><Details {...props} /></App>;
                }} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
