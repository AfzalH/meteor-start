import React from 'react';
export default class ReadOnlyRow extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <tr>
                <td><strong>{this.props.label}</strong></td>
                <td className="wide-col">
                    <span>
                        {this.props.value || <i className="grey-text thin">No Value</i>}
                    </span>
                </td>
            </tr >
        );
    }
}
