import React, {Component} from 'react';

class Login extends Component {
    render() {
        return (
            <div className="loginWrap input-field">
                <div className="row">
                    <span> Username </span>
                    <input placeholder="John" id="first_name" type="text" />
                </div>
                <div className="row">
                    <span> Password </span>
                    <input placeholder="*******" id="first_name" type="password" />
                </div>
                <button className="btn light-blue darken-4">Login</button>
            </div>
        );
    }
}

export default Login;
