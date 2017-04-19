import { connect } from 'react-redux';
import * as accountActions from '../../actions/account';
import Login from '../views/Login';

const mapStateToProps = (state, prop) => {
    return {
        username: state.account.username,
        loading: state.account.loading,
        error: state.account.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(accountActions.tryToLogin(username, password)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
