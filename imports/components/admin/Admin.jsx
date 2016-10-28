import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './layout/Header';
import SideNav from './layout/SideNav';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users_to_load: 10,
            users_filter_text: ''
        }
    }
    loadMoreUsers() {
        this.setState(function (prevState, props) {
            return { users_to_load: prevState.users_to_load + 10 };
        });
    }
    render() {
        return (
            <div>
                <Header />
                <div id="main">
                    <div className="wrapper">
                        <SideNav  path={this.props.location.pathname}/>
                        <section id="content">
                            <div className="admin container">
                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                                    {React.cloneElement(this.props.children, {
                                        key: this.props.location.pathname,
                                        state: this.state,
                                        loadMoreUsers: this.loadMoreUsers.bind(this)
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