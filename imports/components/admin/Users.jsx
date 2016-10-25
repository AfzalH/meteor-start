import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Users extends React.Component {
    componentDidMount() {
        jQuery(".dropdown-button").dropdown();
    }
    changePaginationValue(val) {
        // this.props.rootChangePaginationValue(val);
        this.props.changeUsersPerPage(val);
    }
    render() {
        let {users_per_page, users_filter_text, users_page_no} = this.props.state;
        return (
            <div className="row">
                <div className="col s12 l12">
                    <h4>Lets administer our Users</h4>
                    {(!this.props.usersReady) ?
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div> : <div className="progressPlaceholder"></div>}
                    <ul className="collection with-header">
                        <li className="collection-header">
                            <div className="row">
                                <div className="col s8">
                                    <p>Filter</p>
                                </div>
                                <div className="col s4">
                                    <a className="btn dropdown-button waves-effect waves-light right red lighten-1" data-activates="pagination-dropdown">{users_per_page} per page</a>
                                    <ul id="pagination-dropdown" className="dropdown-content">
                                        {(users_per_page != 2) ? <li><a onClick={this.changePaginationValue.bind(this, 2)}>2</a></li> : ''}
                                        {(users_per_page != 5) ? <li><a onClick={this.changePaginationValue.bind(this, 5)}>5</a></li> : ''}
                                        {(users_per_page != 10) ? <li><a onClick={this.changePaginationValue.bind(this, 10)}>10</a></li> : ''}
                                        {(users_per_page != 25) ? <li><a onClick={this.changePaginationValue.bind(this, 25)}>25</a></li> : ''}
                                        {(users_per_page != 50) ? <li><a onClick={this.changePaginationValue.bind(this, 50)}>50</a></li> : ''}
                                        {(users_per_page != 100) ? <li><a onClick={this.changePaginationValue.bind(this, 100)}>100</a></li> : ''}
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                            {this.props.users.map((user) => (<User key={user._id} user={user} />))}
                        </ReactCSSTransitionGroup>
                    </ul>
                </div>
            </div>
        );
    }
}

export default createContainer((params) => {
    let handle = Meteor.subscribe('users', params.state.users_per_page);
    const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch();
    return { users: users, state: params.state, changeUsersPerPage: params.changeUsersPerPage, usersReady: handle.ready() };
}, Users);