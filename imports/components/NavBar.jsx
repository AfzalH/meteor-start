import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import Auth from '../../imports/auth';

class NavBar extends React.Component {
    componentDidMount() {
        jQuery('.button-collapse').sideNav({
            closeOnClick: true
        });
    }
    render() {
        return (
            <nav className="brown lighten-1" role="navigation">
                <div className="nav-wrapper container">
                    <Link id="logo-container" to="/" className="brand-logo"><img src="/srizon-logo-full.svg" /></Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link activeClassName={this.props.path === '/' ? "brown" : ""} to="/">Home</Link></li>
                        <li><Link activeClassName="brown" to="/about">About</Link></li>
                        <li><Link activeClassName="brown" to="/account">Account</Link></li>
                        {this.props.isSuperAdmin?
                        <li><Link activeClassName="brown" to="/admin">Admin</Link></li>:''}
                    </ul>

                    <ul id="nav-mobile" className="side-nav">
                        <li><Link activeClassName={this.props.path === '/' ? "grey lighten-2" : ""} to="/">Home</Link></li>
                        <li><Link activeClassName="grey lighten-2" to="/about">About</Link></li>
                        <li><Link activeClassName="grey lighten-2" to="/account">Account</Link></li>
                        <li><Link activeClassName="grey lighten-2" to="/admin">Admin</Link></li>
                    </ul>
                    <Link to="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></Link>
                </div>
            </nav>
        );
    }
}

export default createContainer((props) => {
    return { isSuperAdmin: Auth.isSuperAdmin(), path: props.path};
}, NavBar);
