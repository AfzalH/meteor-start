import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
class Users extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="row">
                <div className="col s12 l12">
                    <h3>User List Here</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum doloremque eligendi eveniet quidem. Assumenda excepturi doloremque, quisquam, dolor magnam ratione.</p>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    return {};
}, Users);