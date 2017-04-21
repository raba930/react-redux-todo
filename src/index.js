import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Details from './components/containers/Details';
import TodoList from './components/containers/TodoList';
import Login from './components/containers/Login';
import Register from './components/containers/Register';
import Store from './store';
import { checkToken } from './actions/account';
import './stylesheet/index.css';
import 'materialize-css';
import 'materialize-css/bin/materialize.css';

const store = Store();

const PrivateRoute = ({ render, ...rest }) => (
    <Route {...rest} render={props => (
        store.getState().account.loggedIn ? (
            render(props)
        ) : (
            <Redirect to={{
                pathname: '/login'
            }}/>
        )
    )}/>
)

let renderUI = () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <div>
                    <PrivateRoute exact path="/" render={() => {
                        return <App><TodoList /></App>;
                    }} />
                    <PrivateRoute exact path="/details/:id" render={(props) => {
                        return <App><Details {...props} /></App>;
                    }} />
                    <Route exact path="/login" render={() => {
                        return <App><Login /></App>;
                    }} />
                    <Route exact path="/register" render={() => {
                        return <App><Register /></App>;
                    }} />
                </div>
            </Router>
        </Provider>,
        document.getElementById('root')
    );
}


if (localStorage.accessToken) {
    store.dispatch(checkToken(localStorage.accessToken))
        .then(renderUI)
} else {
    renderUI();
}


