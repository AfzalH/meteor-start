import React from 'react';
import ReactDOM from 'react-dom';

export default class FilterInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: this.props.filterText || ''
        }
    }
    inputChanged(event) {
        this.setState({
            filterText: event.target.value
        });
        this.props.setFilterText(event.target.value);
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.filter).focus();
    }
    render() {
        return (
            <div className="row">
                <div className="col s12 l6">
                    <input
                        type="text"
                        ref="filter"
                        placeholder={this.props.placeholder}
                        value={this.state.filterText}
                        onChange={this.inputChanged.bind(this)}/>
                </div>
            </div>
        );
    }
}
