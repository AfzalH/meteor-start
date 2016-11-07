import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ToggleValidEmail from '../input/ToggleValidEmail';
import EditableRow from '../partials/EditableRow';
import EmailRow from './UserDetail/EmailRow';
import CheckBox4 from '../input/CheckBox4';
import Permissions, { myPerm } from '../../startup/both/permissions';
import { Random } from 'meteor/random';

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
    render() {
        const user = this.props.user;
        return (
            (!this.props.userReady) ?
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> :
                <div className="row">
                    <div className="col s12 l12">
                        <h4 className="thin"><i className="material-icons">person_outline</i> {(user.profile && user.profile.name) || 'No Name'}</h4>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">person</i>Profile</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill">
                                            <tbody>
                                                <EditableRow label="Name" objKey="profile.name" saveFunc={this.saveRow.bind(this)} value={(user.profile && user.profile.name)} />
                                                <EditableRow label="Username" objKey="username" saveFunc={this.saveRow.bind(this)} value={user.username} />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">email</i>Email Addresses</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill">
                                            <tbody>
                                                {user.registered_emails.map((email, i) => <EmailRow userId={user._id} key={i} i={i + 1} email={email} />)}
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
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">vpn_key</i>Manage Permissions</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <div className="permission-list row">
                                            {
                                                Permissions.map((permission) => <CheckBox4 key={permission.alias} alias={permission.alias} title={permission.title} checked={user.roles && user.roles.indexOf(permission.alias) !== -1} onChange={this.togglePermission.bind(this)} />)
                                            }
                                        </div>
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
    const handle = Meteor.subscribe('single_user', props.params.id);
    const user = Meteor.users.findOne({ _id: props.params.id });
    return { user: user, userReady: handle.ready(), setError: props.setError };
}, UserDetail);