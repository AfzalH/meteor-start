import React from 'react';
import { Link } from 'react-router';
import HeaderLogo from './HeaderLogo';
import HeaderSearch from './HeaderSearch';
import HeaderRightIcons from './HeaderRightIcons';

export default class Header extends React.Component {
    componentDidMount() {

    }
    render() {
        return (
            <header id="header" className="page-topbar">
                <div className="navbar-fixed">
                    <nav className="brown lighten-1">
                        <div className="nav-wrapper">
                            <HeaderLogo />
                            <HeaderSearch />
                            <HeaderRightIcons />
                        </div>
                    </nav>
                </div>
            </header>
        );
    }
}
