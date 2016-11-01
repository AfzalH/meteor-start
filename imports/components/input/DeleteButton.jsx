import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class DeleteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delete_clicked: false
        }
    }
    deleteClicked() {
        this.setState({
            delete_clicked: true
        });
    }
    cancelClicked() {
        this.setState({
            delete_clicked: false
        });
    }
    componentDidMount() {
    }
    render() {
        return (
            <span className="delete-button">
                <i className="delete-icon material-icons"
                    onClick={this.deleteClicked.bind(this)}>
                    delete</i>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                    {this.state.delete_clicked ?
                        <span key="1" className="confirm-delete">
                            <button className="btn green" onClick={this.cancelClicked.bind(this)}>Cancel</button>
                            <button className="btn red">Confirm</button>
                        </span>
                        :
                        ''
                    }
                </ReactCSSTransitionGroup>

            </span>
        );
    }
}