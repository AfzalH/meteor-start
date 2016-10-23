import React from 'react';
import { Link } from 'react-router';
export default class User extends React.Component {
    render() {
        const user = this.props.user;
        return (
            <li>{(user.profile && user.profile.name) ? this.props.user.profile.name : 'No Name'}</li>
        );
    }
}