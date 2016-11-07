import React from 'react';
import { Link } from 'react-router';
export default class CheckBox4 extends React.Component {
    iChanged(){
        this.props.onChange(this.props.alias);
    }
    render() {
        return (
            <div className="col s4">
                <div className="checkbox4">
                    <input id={"chk"+this.props.alias} type="checkbox" onChange={this.iChanged.bind(this)} defaultChecked={this.props.checked}/>
                    <label htmlFor={"chk"+this.props.alias}>{this.props.title}</label>
                </div>
            </div>
        );
    }
}