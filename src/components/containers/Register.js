import { connect } from 'react-redux';
import * as accountActions from '../../actions/account';
import Register from '../views/Register';

const mapStateToProps = (state, prop) => {
    return {
        loading: state.account.loading,
        error: state.account.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        register: (username, password) => dispatch(accountActions.tryToSignUp(username, password)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
