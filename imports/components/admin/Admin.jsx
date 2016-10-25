import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
var _ = require('lodash');

import Header from './layout/Header';
import SideNav from './layout/SideNav';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users_per_page: 10,
            users_filter_text: '',
            users_page_no: 1
        }
    }
    changeUsersPerPage(value) {
        this.setState({ users_per_page: value });
    }
    render() {
        return (
            <div>
                <Header />
                <div id="main">
                    <div className="wrapper">
                        <SideNav />
                        <section id="content">
                            <div className="admin container">
                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                                    {React.cloneElement(this.props.children, {
                                        key: this.props.location.pathname,
                                        state: this.state,
                                        changeUsersPerPage: this.changeUsersPerPage.bind(this)
                                    })}
                                </ReactCSSTransitionGroup>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        );
    }
}

export default createContainer(() => {
    return {};
}, Admin);