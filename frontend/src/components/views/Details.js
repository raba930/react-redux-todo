import React, {Component} from 'react';
import DetailsHeader from '../elements/DetailsHeader';
import Button from '../elements/Button';
import TodoDetails from '../elements/TodoDetails';


class Details extends Component {
    constructor(props) {
        super(props);
        this.addInfo = this.addInfo.bind(this);
        this.goToHomepage = this.goToHomepage.bind(this);
    }
    addInfo() {
        const id = Number(this.props.match.params.id);
        const text = this.infoArea.value;
        this.props.addTodoInfo(id, text);
        this.goToHomepage();
    }
    goToHomepage() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="detailsWrap">
                <DetailsHeader text={this.props.todo.text} completed={this.props.todo.completed}></DetailsHeader>
                <TodoDetails
                    innerRef={infoArea => { this.infoArea = infoArea; }}
                    placeholder="Aditional informations about this todo"
                    defaultValue={this.props.todo.info}>
                </TodoDetails>
                <Button right onClick={this.goToHomepage}> Cancel </Button>
                <Button right comfort onClick={this.addInfo}> Save </Button>
            </div>
        );
    }
}

export default Details;
