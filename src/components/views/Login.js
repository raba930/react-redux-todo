import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login() {
        let username = this.refs.username.value;
        let pass = this.refs.pass.value;
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
                <div className="row">
                    <span> Username </span>
                    <input ref="username" placeholder="John" id="first_name" type="text" />
                </div>
                <div className="row">
                    <span> Password </span>
                    <input ref="pass" placeholder="*******" id="first_name" type="password" />
                </div>
                <button onClick={this.login} className="btn light-blue darken-4">Login</button>
                <button className="btn light-blue darken-4">Register</button>
            </div>
        );
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

export default Login;
