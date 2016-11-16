import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { createContainer } from 'meteor/react-meteor-data';
import UserProfile from './UserProfile';

class Account extends Component {
    componentDidMount() {
        if (ReactDom.findDOMNode(this.refs.account)) {
            this.view = Blaze.render(Template.atForm, ReactDom.findDOMNode(this.refs.account));
        }
    }
    componentDidUpdate() {
        if (this.view) Blaze.remove(this.view);
        if (ReactDom.findDOMNode(this.refs.account)) {
            this.view = Blaze.render(Template.atForm, ReactDom.findDOMNode(this.refs.account));
        }
    }
    componentWillUnmount() {
        if (this.view) Blaze.remove(this.view);
    }
    render() {
        return (
            <div className="container">
                {this.props.loggedIn ?
                    <UserProfile id={this.props.loggedIn} setError={this.props.setError} />
                    :
                    <div className="row">
                        <div className="col s12 l6 offset-l3">
                            <span ref="account"></span>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

export default createContainer(() => {
    return { loggedIn: Meteor.userId() };
}, Account);