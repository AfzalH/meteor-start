import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
class UserDetail extends React.Component {
    componentDidUpdate() {
        if (this.props.userReady) {
            jQuery('.collapsible').collapsible({
                accordion: false
            });
        }
    }
    sendTestEmail(target){
        Meteor.call('sendTestEmail',target);
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
                                        <table className="wide-col-fill responsive-table">
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
                                <div className="collapsible-header"><i className="material-icons">email</i>Email Addresses</div>
                                <div className="collapsible-body">
                                    <div className="collapsible-content">
                                        <table className="wide-col-fill responsive-table">
                                            <tbody>
                                                {user.registered_emails.map((email, i) => (
                                                    <tr key={email + i}>
                                                        <td><strong>Address</strong></td>
                                                        <td className="wide-col">{(email.address) ? email.address : 'Field Mismatch'}</td>
                                                        <td><button className="btn" onClick={this.sendTestEmail.bind(this,email.address)}>Send Test</button></td>
                                                        <td><i className="material-icons">edit</i></td>
                                                    </tr>
                                                ))}

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