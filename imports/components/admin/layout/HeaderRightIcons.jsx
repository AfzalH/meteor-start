import React from 'react';
import { Link } from 'react-router';
export default class HeaderRightIcons extends React.Component {
    componentDidMount() {
        function toggleFullScreen() {
            if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                if (document.documentElement.requestFullScreen) {
                    document.documentElement.requestFullScreen();
                }
                else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                }
                else if (document.documentElement.webkitRequestFullScreen) {
                    document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                }
            }
            else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        }

        $('.toggle-fullscreen').click(function () {
            toggleFullScreen();
        });
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