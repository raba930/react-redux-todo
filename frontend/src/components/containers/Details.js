import { connect } from 'react-redux';
import * as actions from '../../actions/account';
import Details from '../views/Details';

const mapStateToProps = (state, prop) => {
    const todo = state.account.todos.find(todo => todo._id === prop.match.params.id);
    return {
        todo: todo
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addTodoInfo: (id, todoInfo) => dispatch(actions.addTodoInfo(id, todoInfo)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Details);
