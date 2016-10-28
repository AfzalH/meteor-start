import React from 'react';
import { Link } from 'react-router';
import Faker from 'faker';
import gravatar from 'gravatar';
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
                <img src={gravatar.url(user.emails && user.emails[0].address, { d: 'mm' })} alt="" className="circle" />
                <span className="title">{(user.profile && user.profile.name) ? this.props.user.profile.name : 'No Name'}</span>
                <p>
                    {user.registered_emails ? user.registered_emails[0].address :
                        user.emails ? user.emails[0].address : ''}
                </p>
                <Link className="secondary-content" title="Delete">
                    <i className="material-icons red-text">delete</i></Link>
            </li>
        );
    }
}