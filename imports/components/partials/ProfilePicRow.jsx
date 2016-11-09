import React from 'react';
import Radio1 from '../input/Radio1';
import FileUpload from '../input/FileUpload';
import proPicSources from '../../startup/both/proPicSources';
import { profilePics } from '../../api/users/profilePics';
export default class ProfilePicRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSource: (this.props.user.profile && this.props.user.profile.picSource) || 'none'
        }
    }

    cancelClicked() {
    }

    saveClicked() {
    }

    componentDidUpdate() {
    }

    sourceChanged(newSource) {
        this.setState({
            currentSource: newSource
        });
        Meteor.call('profilePicSourceChange', this.props.user._id, newSource);
    }
    

    render() {
        return (
            <tr>
                <td className="alignTop"><strong>{this.props.label}</strong></td>
                <td className="wide-col">
                    {proPicSources.map((source) => <Radio1
                        checked={this.state.currentSource}
                        group="source"
                        label={source.label}
                        onChange={this.sourceChanged.bind(this)}
                        id={source.id}
                        key={source.id} />)}
                    {this.state.currentSource == 'upload' ?
                        <FileUpload fileCollection={profilePics} setError={this.props.setError} />
                        :
                        ''
                    }
                </td>
            </tr >
        );
    }
}