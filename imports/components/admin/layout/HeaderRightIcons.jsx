import React from 'react';
import { Link } from 'react-router';
export default class HeaderRightIcons extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <ul className="right hide-on-med-and-down">
                <li>
                    <a href="#" className="waves-effect waves-block waves-light toggle-fullscreen">
                        <i className="large material-icons">settings_overscan</i>
                    </a>
                </li>
                <li>
                    <a href="#" className="waves-effect waves-block waves-light notification-button" data-activates="notifications-dropdown">
                        <i className="large material-icons">notifications_none<small className="notification-badge">25</small>
                        </i>
                    </a>
                </li>
                <li>
                    <a href="#" data-activates="chat-out" className="waves-effect waves-block waves-light chat-collapse">
                        <i className="large material-icons">history</i>
                    </a>
                </li>
            </ul>
        );
    }
}