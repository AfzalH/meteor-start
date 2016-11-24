import React from 'react';
import DeleteButton from '../input/DeleteButton';
export default class EmailRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailSending: false,
            emailSent: false
        }
    }
    deleteConfirmed() {
        let that = this;
        Meteor.call('deleteUserEmail', this.props.userId, this.props.email.address, function (err, val) {
            if (err) {
                that.props.setError(err.reason);
            }
        });
    }
    componentDidMount() {
        jQuery('.tooltipped').tooltip({ delay: 50 });
    }
    verifyClicked(email) {
        if(this.props.adminView) return;
        this.setState({ emailSending: true });
        let that = this;
        Meteor.call('sendEmailVerificationEmail', email, function (err, val) {
            if (err) {
                that.setState({ emailSending: false });
            }
            else {
                that.setState({ emailSent: true, emailSending: false });
            }
        });
    }
    render() {
        const email = this.props.email;
        return (
            <tr>
                <td width="5%"><strong>{this.props.i}</strong></td>
                <td width="90%">
                    <div className="left">
                        <span className="email-text left">{email.address || 'Field mismatch'}</span>
                        {
                            (this.state.emailSent && !email.verified) ?
                                <span className="left green-text"><small>Email Sent. Check email for verification link</small></span>
                                :
                                (this.state.emailSending && !email.verified) ?
                                    <span className="left grey-text"><small>Sending Email...</small></span>
                                    :
                                    (!email.verified) ?
                                        <span className="blue-text left mobile-mtb point" onClick={this.verifyClicked.bind(this, email.address)}>
                                            <i className="material-icons left yellow-text tooltipped" data-tooltip="Not Verified">warning</i>{this.props.adminView?'Not Verified':'Verify Now'}</span>
                                        :
                                        <span className="green-text left mobile-mtb"><i className="material-icons left">check</i>Verified</span>
                        }
                    </div>
                </td>
                <td width="5%">
                    <DeleteButton deleteConfirmed={this.deleteConfirmed.bind(this)} />
                </td>
            </tr>
        );
    }
}