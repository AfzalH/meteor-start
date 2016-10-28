import React from 'react';
import { Link } from 'react-router';
export default class SideNav extends React.Component {
    componentDidMount() {
        jQuery('.sidebar-collapse').sideNav({
            edge: 'left' 
        });
    }
    render() {
        return (
            <aside id="left-sidebar-nav">
                <ul id="slide-out" className="side-nav fixed leftside-navigation">
                    <li className="bold active">
                        <Link to="/admin"  activeClassName={this.props.path === '/admin' ? "grey lighten-2" : ""} className="waves-effect waves-dark">
                            <i className="material-icons">dashboard</i> Dashboard</Link>
                        <Link to="/admin/users" activeClassName="grey lighten-2" className="waves-effect waves-dark">
                            <i className="material-icons">supervisor_account</i> Users</Link>
                    </li>
                </ul>
                <a href="#" data-activates="slide-out"
                    className="sidebar-collapse btn-floating btn-medium waves-effect waves-light hide-on-large-only red">
                    <i className="material-icons">menu</i>
                </a>
            </aside>
        );
    }
}