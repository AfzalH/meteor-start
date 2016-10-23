import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import User from './User';
class Users extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="row">
                <div className="col s12 l12">
                    <h3>User List Here</h3>
                    <ul>
                        {this.props.users.map((user) => (<User key={user._id} user={user} />))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('users2');
    const users = Meteor.users.find({}).fetch();
    return { users: users };
}, Users);