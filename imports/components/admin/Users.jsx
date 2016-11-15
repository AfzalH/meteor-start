import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import FilterInput from '../input/FilterInput';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalUser: 'counting...'
        }
    }
    componentDidMount() {
        jQuery(".dropdown-button").dropdown();
    }
    componentWillMount() {
        Meteor.call('getUserCount', this.updateTotalUser.bind(this));
    }
    updateTotalUser(err, data) {
        this.setState({
            totalUser: data
        });
    }
    loadMoreUsers() {
        this.props.loadMoreUsers();
    }
    render() {
        let {users_to_load, users_filter_text} = this.props.state;
        return (
            <div className="row">
                <div className="col s12 l12">
                    <h4 className="thin">User Management</h4>
                    <ul className="collection with-header">
                        <li className="collection-header">
                            <div className="row">
                                <div className="col s12">
                                    <FilterInput placeholder="Type to filter by Name or Email"
                                        filterText={this.props.state.users_filter_text}
                                        setFilterText={this.props.setFilterText} />
                                </div>
                            </div>
                        </li>
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                            {this.props.users.map((user, index) => (<User key={user._id} user={user} index={index} />))}
                        </ReactCSSTransitionGroup>
                    </ul>

                    {(!this.props.usersReady) ?
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        (users_to_load <= this.props.users.length) ?
                            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                                <div className="row">
                                    <div className="col s12 center">
                                        {this.props.state.users_filter_text.length?'':
                                        <p>Showing {this.props.users.length} of {this.state.totalUser}</p>}
                                        <a className="btn" onClick={this.loadMoreUsers.bind(this)}> Load More...</a>
                                    </div>
                                </div>
                            </ReactCSSTransitionGroup> : ''
                    }
                </div>
            </div>
        );
    }
}

export default createContainer((params) => {
    let handle = Meteor.subscribe('users', params.state.users_to_load, params.state.users_filter_text);
    Meteor.subscribe('loggedInUser');
    const users = Meteor.users.find({}).fetch();
    return {
        users: users,
        state: params.state,
        loadMoreUsers: params.loadMoreUsers,
        setFilterText: params.setFilterText,
        usersReady: handle.ready()
    };
}, Users);