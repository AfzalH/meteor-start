import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './layout/Header';
import SideNav from './layout/SideNav';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {
                perPage: 10,
                filterText: '',
                page: 1
            }
        }
    }
    changeUsersState(key, value) {
        var obj = this.state.users;
        obj[key] = value;
        this.setState(
            {
                users: obj
            }
        );
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
                                        changeUsersState: this.changeUsersState.bind(this)
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