import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Header from './layout/Header';

class Admin extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="admin container">
                    <div className="row">
                        <div className="col s12 l12">
                            <h3>Admin Buttons Here</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum doloremque eligendi eveniet quidem. Assumenda excepturi doloremque, quisquam, dolor magnam ratione.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    return {};
}, Admin);