import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../elements/Button';
import Input from '../elements/Input';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login() {
        let username = this.username.value;
        let pass = this.password.value;
        this.props.login(username, pass)
            .then((action) => {
                if (!action.error) {
                    localStorage.setItem('accessToken', action.userToken);
                    this.context.router.history.push('/');
                }
            });
    }
    render() {
        if (this.props.loading) return(<div className="preloader" />);
        else return (
            <div className="loginWrap">
                {this.props.error ? <span>{this.props.error}</span> : ''}
                <Input innerRef={username => { this.username = username; }} placeholder="John" type="text"></Input>
                <Input innerRef={password => { this.password = password; }} placeholder="******" type="password"></Input>
                <Button onClick={this.login} comfort right>Login</Button>
                <Link to='/register'>
                    <Button comfort right>Register</Button>
                </Link>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};

export default Login;
