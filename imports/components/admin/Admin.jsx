import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './layout/Header';
import SideNav from './layout/SideNav';

class Admin extends React.Component {
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
                                    {React.cloneElement(this.props.children, { key: this.props.location.pathname })}
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