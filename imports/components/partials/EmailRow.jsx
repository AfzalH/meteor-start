import React from 'react';
import DeleteButton from '../input/DeleteButton';
export default class EmailRow extends React.Component {
    deleteConfirmed() {
        let that = this;
        Meteor.call('deleteUserEmail', this.props.userId, this.props.email.address,function(err,val){
            if(err){
                that.props.setError(err.reason);
            }
        });
    }
    render() {
        const email = this.props.email;
        return (
            <tr>
                <td width="5%"><strong>{this.props.i}</strong></td>
                <td width="60%">
                    <span className="email-text">{ email.address || 'Field mismatch'}</span>
                </td>
                <td width="30%">
                {(!email.verified)?
                        <span className="blue-text left"><i className="material-icons left yellow-text">warning</i>Verify Now</span>
                        :
                        <span className="green-text left"><i className="material-icons left">check</i>Verified</span>
                    }
                </td>
                <td width="5%">
                    <DeleteButton deleteConfirmed={this.deleteConfirmed.bind(this)} />
                </td>
            </tr>
        );
    }
}