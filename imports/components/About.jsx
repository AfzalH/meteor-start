import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class About extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s12 l12">
                        <h3>About Component Here</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Corporis dicta distinctio itaque, doloribus adipisci velit, minus, modi, sit vero omnis pariatur iusto eos optio consequatur.Recusandae ducimus eius sed quod.</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
  return {};
}, About);