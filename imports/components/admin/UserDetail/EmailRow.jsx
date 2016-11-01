import React from 'react';
import DeleteButton from '../../input/DeleteButton';
export default class EmailRow extends React.Component {
    componentDidMount() {
    }
    render() {
        const email = this.props.email;
        return (
            <tr>
                <td><strong>{this.props.i}</strong></td>
                <td className="wide-col">{(email.address) ? email.address : 'Field mismatch'}</td>
                <td>
                    <DeleteButton />
                </td>
            </tr>
        );
    }
}