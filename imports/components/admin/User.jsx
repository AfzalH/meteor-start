import React from 'react';
import { Link } from 'react-router';
import Faker from 'faker';
import gravatar from 'gravatar';
export default class User extends React.Component {
    render() {
        const user = this.props.user;
        return (
            <li className="collection-item avatar">
                <img src={gravatar.url(user.emails && user.emails[0].address, { d: 'mm' })} alt="" className="circle" />
                <span className="title">{(user.profile && user.profile.name) ? this.props.user.profile.name : 'No Name'}</span>
                <p>First Line <br />
                    Second Line
            </p>
                <Link className="secondary-content" title="Delete">
                <i className="material-icons red-text">delete</i></Link>
            </li>
        );
    }
}