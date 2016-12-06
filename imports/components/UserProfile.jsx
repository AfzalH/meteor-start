import React from 'react';
import ReactDom from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Template } from 'meteor/templating';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ToggleValidEmail from './input/ToggleValidEmail';
import EditableRow from './partials/EditableRow';
import ReadOnlyRow from './partials/ReadOnlyRow';
import ProfilePicRow from './partials/ProfilePicRow';
import EmailRow from './partials/EmailRow';
import CheckBox4 from './input/CheckBox4';
import Permissions, { findPermissionTitles } from '../data/both/permissions';
import _ from 'lodash';

class UserDetail extends React.Component {
    componentDidMount() {
    }
    componentDidUpdate() {
        if (this.props.userReady) {
            jQuery('.collapsible').collapsible({
                accordion: false
            });
        }
    }
    componentWillUnmount() {
    }
    togglePermission(permission) {
        Meteor.call('togglePermission', this.props.user._id, permission);

    }
    sendTestEmail(target) {
        Meteor.call('sendTestEmail', target);
    }
    saveNewEmail(email_address) {
        Meteor.call('addNewUserEmail', this.props.user._id, email_address, (err, res) => {
            if (err) {
                this.props.setError(err.reason);
            }
        });
    }
    saveRow(key, value) {
        Meteor.call('saveUserValue', this.props.user._id, key, value, (err, res) => {
            if (err) {
                this.props.setError(err.reason);
            }
        });
    }
    logout() {
        Meteor.logout();
    }
    render() {
        const user = this.props.user;
        const setError = this.props.setError;
        let permissionTitles = '';
        if (user && user.roles) {
            permissionTitles = _.join(findPermissionTitles(user.roles, Permissions),', ');
        }
        return (
            (!this.props.userReady) ?
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> :
                <div className="row">
                    <div className="col s12 l12">
                        <h4 className="thin"><i className="material-icons">person_outline</i> {(user.profile && user.profile.name) || 'No Name'} <span className="btn right logout-button grey" onClick={this.logout}>Logout</span></h4>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">person</i>Profile</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill">
                                            <tbody>
                                                <EditableRow label="Name" objKey="profile.name" saveFunc={this.saveRow.bind(this)} value={(user.profile && user.profile.name)} />
                                                <ReadOnlyRow label="Roles" value={permissionTitles} />
                                                <ProfilePicRow setError={this.props.setError} user={user} label="Profile Picture" />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">email</i>Email Addresses</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill responsive-table">
                                            <tbody>
                                                {user.registered_emails.map((email, i) => <EmailRow setError={setError} userId={user._id} key={i} i={i + 1} email={email} />)}
                                                <tr key="anotheremail">
                                                    <td className="wide-col" colSpan="3">
                                                        <ToggleValidEmail saveFunc={this.saveNewEmail.bind(this)} />
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default createContainer((props) => {
    const handle = Meteor.subscribe('single_user', props.id);
    const user = Meteor.users.findOne({ _id: props.id });
    return { user: user, userReady: handle.ready(), setError: props.setError };
}, UserDetail);