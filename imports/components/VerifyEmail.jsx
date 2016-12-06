import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
class VerifyEmail extends React.Component {
    constructor(props) {
        super(props);
        this.verification_text_suffix = ['', ' .', ' ..', ' ...', ' ....', ' .....']
        this.state = {
            verification: 'verifying',
            verification_text_index: 0
        }
    }
    tick() {
        vti = this.state.verification_text_index;
        vti = (vti + 1) % this.verification_text_suffix.length;
        this.setState({
            verification_text_index: vti
        })
    }
    componentDidMount() {
        this.ticker = setInterval(this.tick.bind(this), 500);
        Meteor.call('verifyEmail', this.props.userid, this.props.email, this.props.hash, (err, res) => {
            if (err) {
                this.setState({
                    verification: 'error'
                });
                setTimeout(() => {
                    this.props.history.replace('/account');
                }, 3000);
            }
            else {
                this.setState({
                    verification: 'verified'
                });
                setTimeout(() => {
                    this.props.history.replace('/account');
                }, 1000);
            }
        });
    }
    componentWillUnmount() {
        if (this.ticker) { clearInterval(this.ticker) }
    }
    render() {
        return (
            <div className="container">
                <div className="top-space">
                    {this.state.verification == 'verifying' ?
                        <h3 className="thin">Verifying email {this.verification_text_suffix[this.state.verification_text_index]}</h3>
                        : this.state.verification == 'error' ?
                            <h3 className="thin red-text">Verification link expired or wrong!  Redirecting to account page...</h3>
                            : this.state.verification == 'verified' ?
                                <h3 className="thin green-text">Email Verified! Redirecting to account page...</h3>
                                : ''
                    }
                </div>
            </div>
        );
    }
}

export default createContainer((props) => {
    return { userid: props.params.userid, email: props.params.email, hash: props.params.hash };
}, VerifyEmail);