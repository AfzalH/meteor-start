import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ToggleValidEmail from '../input/ToggleValidEmail';
import EmailRow from './UserDetail/EmailRow';

class UserDetail extends React.Component {
    componentDidUpdate() {
        if (this.props.userReady) {
            jQuery('.collapsible').collapsible({
                accordion: false
            });
        }
    }
    sendTestEmail(target) {
        Meteor.call('sendTestEmail', target);
    }
    saveNewEmail(email_address) {
        Meteor.call('addNewUserEmail', this.props.user._id, email_address);
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
                        <h4 className="thin"><i className="material-icons">person_outline</i> {(user.profile && user.profile.name) ? user.profile.name : 'No Name'}</h4>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">person</i>Profile</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill">
                                            <tbody>
                                                <tr>
                                                    <td><strong>Name</strong></td>
                                                    <td className="wide-col">{(user.profile && user.profile.name) ? user.profile.name : 'No Name'}</td>
                                                    <td><i className="material-icons">edit</i></td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Username</strong></td>
                                                    <td className="wide-col">{(user.username) ? user.username : 'No Username'}</td>
                                                    <td><i className="material-icons">edit</i></td>
                                                </tr>
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
                                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                                                    {user.registered_emails.map((email, i) => <EmailRow userId={user._id} key={i} i={i + 1} email={email} />)}
                                                </ReactCSSTransitionGroup>
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
                                <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
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
    return { user: user, userReady: handle.ready() };
}, UserDetail);