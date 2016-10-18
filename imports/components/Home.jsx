import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Home extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 l12">
                        <h4 className="thin">Latest Content</h4>
                        <p>
                            latest content goes here
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer((params) => {
  return {};
}, Home);