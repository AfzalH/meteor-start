import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createContainer } from 'meteor/react-meteor-data';

// imported componenets
import NavBar from './NavBar';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }
    setError(err) {
        this.setState({
            error: err
        });
        $('#error').openModal('open');
    }
    render() {
        return (
            <div>
                <NavBar path={this.props.location.pathname} />
                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={200} transitionLeave={false}>
                    {React.cloneElement(this.props.children, { key: this.props.location.pathname, setError: this.setError.bind(this)}) }
                </ReactCSSTransitionGroup>
                <div id="error" className="modal">
                    <div className="modal-content">
                        <h4>Error</h4>
                        <p>{this.state.error}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn white grey-text text-darken-2 modal-action modal-close">
                            <i className="material-icons left">close</i>
                            Close</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default createContainer(() => {
  return {};
}, App);
