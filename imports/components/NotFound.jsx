import React from 'react';
export default class NotFound extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 l12">
                        <h3>Not Found</h3>
                        <p>This path doesn't exist in our App. Select a valid path from the menu</p>
                    </div>
                </div>
            </div>
        );
    }
}
