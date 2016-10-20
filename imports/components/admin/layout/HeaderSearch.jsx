import React from 'react';
import { Link } from 'react-router';
export default class HeaderSearch extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <div className="header-search-wrapper hide-on-med-and-down">
                <i className="material-icons">search</i>
                <input type="text" name="Search" className="header-search-input z-depth-2" placeholder="Admin Search..." />
            </div>
        );
    }
}