import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
class UserDetail extends React.Component {
    componentDidUpdate() {
        if (this.props.userReady) {
            jQuery('.collapsible').collapsible({
                accordion: false
            });
        }
    }
    render() {
        const user = this.props.user;
        return (
            (!this.props.userReady) ?
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> :
                <div className="row">
                    <div className="col s12 l12">
                        <h4 className="thin"><i className="material-icons">person_outline</i> {(user.profile && user.profile.name) ? this.props.user.profile.name : 'No Name'}</h4>
                        <ul className="collapsible" data-collapsible="expandable">
                            <li>
                                <div className="collapsible-header active"><i className="material-icons">filter_drama</i>First</div>
                                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                                <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                            </li>
                        </ul>
                    </div>
                </div>
        );
    }
}

export default createContainer((props) => {
    const handle = Meteor.subscribe('single_user', props.params.id);
    const user = Meteor.users.findOne({ _id: props.params.id });
    return { user: user, userReady: handle.ready() };
}, UserDetail);