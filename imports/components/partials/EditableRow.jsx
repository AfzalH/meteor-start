import React from 'react';
import ReactDOM from 'react-dom';
export default class EditableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit_form_open: false,
            text: this.props.value
        }
    }
    keyPressed(e) {
        if (e.key === 'Enter') {
            this.saveClicked();
        }
    }
    inputChanged(e) {
        this.setState({
            text: e.target.value
        });
    }
    cancelClicked() {
        this.setState({
            edit_form_open: false,
            text: this.props.value
        });
    }
    saveClicked() {
        this.setState({
            edit_form_open: false,
        });
        this.props.saveFunc(this.props.objKey, this.state.text);
    }
    componentDidUpdate() {
        if (this.state.edit_form_open) {
            Materialize.updateTextFields();
            ReactDOM.findDOMNode(this.refs.field1).focus();
        }
    }
    editClicked() {
        this.setState({
            edit_form_open: true
        })
    }
    render() {
        return (
            <tr>
                <td><strong>{this.props.label}</strong></td>
                <td className="wide-col">
                    {this.state.edit_form_open ?
                        <div className="input-field col s12 l8">
                            <input
                                type="text"
                                ref="field1"
                                name="field1"
                                placeholder={this.props.label}
                                value={this.state.text}
                                onChange={this.inputChanged.bind(this)}
                                onKeyPress={this.keyPressed.bind(this)}
                                className="" />

                            <label
                                htmlFor="field1"
                                data-error="invalid value">
                                Type new value and Save</label>

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
                        :
                        <span>
                            {this.props.value || <i className="grey-text thin">No Value</i>}
                            <i className="material-icons tiny rightside" onClick={this.editClicked.bind(this)}>edit</i>
                        </span>
                    }
                </td>
            </tr >
        );
    }
}