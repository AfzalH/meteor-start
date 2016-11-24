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
    deleteConfirmed(){
        this.cancelClicked();
        this.props.deleteConfirmed();
    }
    render() {
        return (
            <span className="delete-button left">
                <i className="delete-icon material-icons"
                    onClick={this.deleteClicked.bind(this)}>
                    delete</i>
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                    {this.state.delete_clicked ?
                        <span key="1" className="confirm-delete white">
                            <button className="btn green" onClick={this.cancelClicked.bind(this)}>Cancel</button>
                            <button className="btn red" onClick={this.deleteConfirmed.bind(this)}>Confirm</button>
                        </span>
                        :
                        ''
                    }
                </ReactCSSTransitionGroup>

            </span>
        );
    }
}