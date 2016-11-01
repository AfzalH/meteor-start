import React from 'react';
import ValidEmail from './ValidEmail';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
export default class ToggleValidEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form_open: this.props.form_open || false,
        }
    }
    openForm(){
        this.setState({
            form_open: true
        });
    }
    closeForm(){
        this.setState({
            form_open: false
        });
    }
    render() {
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                {this.state.form_open ?
                    <ValidEmail key="emailForm" saveFunc={this.props.saveFunc} closeFunc={this.closeForm.bind(this)} />
                    :
                    <div key="emailButton">
                        <a className="wide-col waves-effect waves-light btn" onClick={this.openForm.bind(this)}>
                            <i className="material-icons left">add</i>Add Another Email Address</a>
                    </div>
                }
            </ReactCSSTransitionGroup>
        );
    }
}