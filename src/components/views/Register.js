import React, {Component} from 'react';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
    }
    register() {
        let username = this.username.value;
        let pass = this.password.value;
        this.props.register(username, pass)
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
                <Button onClick={this.register} comfort right>Register</Button>
                <Link to='/login'>
                    <Button comfort right>Login</Button>
                </Link>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
};


export default Login;
