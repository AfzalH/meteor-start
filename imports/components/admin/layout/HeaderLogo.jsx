import React from 'react';
import { Link } from 'react-router';
export default class HeaderLogo extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <ul className="left">
                <li>
                    <h1 className="logo-wrapper">
                        <Link to="/" className="admin brand-logo darken-1">
                            <img src="/srizon-logo-full.svg" alt="Srizon logo" /></Link>
                        <span className="logo-text">Srizon</span>
                    </h1>
                </li>
            </ul>
        );
    }
}