import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';

class Account extends Component {
    componentDidMount() {
        this.view = Blaze.render(Template.atForm, ReactDom.findDOMNode(this.refs.account));
    }
    componentWillUnmount() {
        Blaze.remove(this.view);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 l6 offset-l3">
                        <span ref="account"></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
  return {};
}, Account);