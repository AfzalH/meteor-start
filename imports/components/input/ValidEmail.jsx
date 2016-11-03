import React from 'react';
import ReactDOM from 'react-dom';
import validator from 'validator';

export default class ValidEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email_address: '',
            valid_email: true
        }
    }
    saveClicked() {
        if (validator.isEmail(this.state.email_address)) {
            this.setState({
                email_address: '',
                valid_email: true
            });
            this.props.closeFunc();
            this.props.saveFunc(this.state.email_address);
        }
        else {
            this.setState({
                valid_email: false
            });
        }
    }
    keyPressed(e) {
        if (e.key === 'Enter') {
            this.saveClicked();
        }
    }
    cancelClicked() {
        this.setState({
            email_address: '',
            valid_email: true
        });
        this.props.closeFunc();
    }
    inputChanged(event) {
        this.setState({
            email_address: event.target.value,
            valid_email: true
        });
    }
    componentDidMount() {
        Materialize.updateTextFields();
        ReactDOM.findDOMNode(this.refs.email).focus();
    }
    render() {
        return (
            <div className="row">
                <div className="input-field col s12 l8">
                    <input
                        type="text"
                        ref="email"
                        name="email"
                        placeholder="email address"
                        value={this.state.email_address}
                        onChange={this.inputChanged.bind(this)}
                        onKeyPress={this.keyPressed.bind(this)}
                        className={(this.state.valid_email ? '' : 'invalid')} />

                    <label
                        htmlFor="email"
                        data-error="invalid email address">
                        Type email address and Save</label>

                    <div className="row">
                        <div className="col s12">
                            <a
                                className="wide-col waves-effect waves-light btn green"
                                onClick={this.saveClicked.bind(this)}>
                                <i className="material-icons left">save</i>Save</a>
                            <a
                                className="wide-col waves-effect waves-light btn white grey-text text-darken-2 right"
                                onClick={this.cancelClicked.bind(this)}>
                                <i className="material-icons left">cancel</i>Cancel</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
