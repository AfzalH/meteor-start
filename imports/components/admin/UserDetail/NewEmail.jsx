import React from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class NewEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form_open: false,
        }
    }
    addAnotherEmailClicked() {
        this.setState({
            form_open: true
        });
    }
    saveAnotherEmailClicked(save) {
        this.setState({
            form_open: false
        });
    }
    componentDidUpdate() {
        Materialize.updateTextFields();
        if (this.state.form_open) {
            ReactDOM.findDOMNode(this.refs.newEmail).focus();
        }
    }
    render() {
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                {this.state.form_open ?
                    <div key="newemailform" className="row">
                        <div className="input-field col s12 l8">
                            <input placeholder="email address" id="email" type="email" ref="newEmail" className="" />
                            <label htmlFor="email" data-error="invalid email address">Type email address and Save</label>
                            <div className="row">
                                <div className="col s12">
                                    <a className="wide-col waves-effect waves-light btn green" onClick={this.saveAnotherEmailClicked.bind(this, true)}>
                                        <i className="material-icons left">save</i>Save</a>
                                    <a className="wide-col waves-effect waves-light btn white grey-text text-darken-2 right" onClick={this.saveAnotherEmailClicked.bind(this, false)}>
                                        <i className="material-icons left">cancel</i>Cancel</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div key="newemailbutton">
                        <a className="wide-col waves-effect waves-light btn" onClick={this.addAnotherEmailClicked.bind(this)}>
                            <i className="material-icons left">add</i>Add Another Email Address</a>
                    </div>
                }
            </ReactCSSTransitionGroup>
        );
    }
}
