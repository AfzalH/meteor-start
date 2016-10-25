import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Users extends React.Component {
    componentDidMount() {
        jQuery(".dropdown-button").dropdown();
    }
    loadMoreUsers() {
        this.props.loadMoreUsers();
    }
    render() {
        let {users_to_load, users_filter_text} = this.props.state;
        return (
            <div className="row">
                <div className="col s12 l12">
                    <h4>Lets administer our Users</h4>
                    <ul className="collection with-header">
                        <li className="collection-header">
                            <div className="row">
                                <div className="col s12">
                                    <p>Filter</p>
                                </div>
                            </div>
                        </li>
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                            {this.props.users.map((user) => (<User key={user._id} user={user} />))}
                        </ReactCSSTransitionGroup>
                    </ul>

                    {(!this.props.usersReady) ?
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        (users_to_load == this.props.users.length)?
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                            <div className="row">
                                <div className="col s12 center">
                                    <a className="btn" onClick={this.loadMoreUsers.bind(this)}>Load More...</a>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>:''
                    }
                </div>
            </div>
        );
    }
}

export default createContainer((params) => {
    let handle = Meteor.subscribe('users', params.state.users_to_load);
    const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
    return { users: users, state: params.state, loadMoreUsers: params.loadMoreUsers, usersReady: handle.ready() };
}, Users);