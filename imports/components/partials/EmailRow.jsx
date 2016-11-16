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
                <td><strong>{this.props.i}</strong></td>
                <td className="wide-col">{(email.address) ? email.address : 'Field mismatch'}</td>
                <td>
                    <DeleteButton deleteConfirmed={this.deleteConfirmed.bind(this)} />
                </td>
            </tr>
        );
    }
}