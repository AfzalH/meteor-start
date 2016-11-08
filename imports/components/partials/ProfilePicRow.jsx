import React from 'react';
import Radio1 from '../input/Radio1';
import proPicSources from '../../startup/both/proPicSources';
import {profilePics} from '../../api/users/profilePics';
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
    fileChanged(e) {
        let that = this;
        if (e.target.files && e.target.files[0]) {
            var upload = profilePics.insert({
                file: e.target.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('end', function (error, fileObj) {
                if (error) {
                    that.props.setError('Error during upload: ' + error);
                } else {
                    alert('File "' + fileObj.name + '" successfully uploaded');
                    // console.log(fileObj);
                }
            });
            upload.start();
        }
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
                        <div className="row">
                            <div className="col s12 top-space">
                                <input type="file" id="propicinput" onChange={this.fileChanged.bind(this)} />
                            </div>
                        </div>
                        :
                        ''
                    }
                </td>
            </tr >
        );
    }
}