import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { profilePics } from '../../api/users/profilePics';

import Header from './layout/Header';
import SideNav from './layout/SideNav';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.setFilterTimeout = null;
        this.state = {
            users_to_load: 10,
            users_filter_text: '',
            error: ''
        }
    }
    loadMoreUsers() {
        this.setState(function (prevState, props) {
            return { users_to_load: prevState.users_to_load + 10 };
        });
    }
    setFilterText(text) {
        clearTimeout(this.setFilterTimeout);
        let that = this;
        this.setFilterTimeout = setTimeout(function () {
            that.setState({
                users_filter_text: text,
                users_to_load: 10
            });
        }, 300);
    }
    setError(err) {
        this.setState({
            error: err
        });
        $('#error').openModal('open');
    }
    render() {
        return (
            <div>
                <Header />
                <div id="main">
                    <div className="wrapper">
                        <SideNav path={this.props.location.pathname} />
                        <section id="content">
                            <div className="admin container">
                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                                    {React.cloneElement(this.props.children, {
                                        key: this.props.location.pathname,
                                        state: this.state,
                                        loadMoreUsers: this.loadMoreUsers.bind(this),
                                        setFilterText: this.setFilterText.bind(this),
                                        setError: this.setError.bind(this)
                                    })}
                                </ReactCSSTransitionGroup>
                            </div>
                        </section>
                    </div>
                </div>

                <div id="error" className="modal">
                    <div className="modal-content">
                        <h4>Error</h4>
                        <p>{this.state.error}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn white grey-text text-darken-2 modal-action modal-close">
                            <i className="material-icons left">close</i>
                            Close</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('profilePics');
    return {};
}, Admin);