import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';

// imported componenets
import NavBar from './NavBar';

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar path={this.props.location.pathname} />
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                    {React.cloneElement(this.props.children, { key: this.props.location.pathname}) }
                </ReactCSSTransitionGroup>
            </div>

        );
    }
}

export default createContainer(() => {
  return {};
}, App);
