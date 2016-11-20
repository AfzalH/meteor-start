import React from 'react';
import { Link } from 'react-router';
import Faker from 'faker';
import gravatar from 'gravatar';
import {getProfilePicture} from '../../api/users/client/helper';
export default class User extends React.Component {
    render() {
        const user = this.props.user;
        // temp code for auto generated user first login trigger
        // if (! user.registered_emails) {
        //     console.log(user.emails[0].address);
        //     Meteor.loginWithPassword(user.emails[0].address,'newpass');
        //     Meteor.logout();
        // }
        // end temp code
        return (
            <li className="collection-item avatar">
                <img src={getProfilePicture(user)} alt="" className="circle" />
                <Link to={"/admin/user/" + user._id}>
                    <span className="title">{(user.profile && user.profile.name) ?
                        this.props.user.profile.name : 'No Name'}</span>
                </Link>
                <p>
                    {user.registered_emails ? user.registered_emails[0].address : "No Email"}
                </p>
                <Link to={"/admin/user/" + user._id} className="secondary-content" title="Edit">
                    <i className="material-icons">edit</i></Link>
            </li>
        );
    }
}