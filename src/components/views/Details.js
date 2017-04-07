import React, {Component} from 'react';

class Details extends Component {
    constructor(props) {
        super(props);
        this.addInfo = this.addInfo.bind(this);
        this.goToHomepage = this.goToHomepage.bind(this);
    }
    addInfo() {
        const id = Number(this.props.match.params.id);
        const text = this.refs.infoArea.value;
        this.props.addTodoInfo(id, text);
        this.goToHomepage();
    }
    goToHomepage() {
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="detailsWrap">
                <h3>
                    <span className="todo-text">{this.props.todo.text}</span>
                    {this.props.todo.completed && <i className="small material-icons done-icon">done</i>}
                </h3>
                <textarea ref="infoArea" defaultValue={this.props.todo.info} className="materialize-textarea" placeholder="Aditional informations about this todo" />
                <button onClick={this.goToHomepage} className="btn light-blue darken-4 cancel-btn"> Cancel </button>
                <button onClick={this.addInfo} className="btn light-blue darken-4 save-details"> Save </button>
            </div>
        );
    }
}

export default Details;
