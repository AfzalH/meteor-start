import React from 'react';
export default class Radio1 extends React.Component {
    iChanged(){
        this.props.onChange(this.props.id);
    }
    render() {
        return (
            <span className="radio1">
                <input name={this.props.group} type="radio" id={this.props.id} defaultChecked={this.props.id == this.props.checked} onChange={this.iChanged.bind(this)} />
                <label htmlFor={this.props.id}>{this.props.label}</label>
            </span>
        );
    }
}