import React from 'react';
import 'cropper';
import Radio1 from '../input/Radio1';
import FileUpload from '../input/FileUpload';
import proPicSources from '../../startup/both/proPicSources';
import { profilePics } from '../../api/users/profilePics';
export default class ProfilePicRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            generating_thumb: false
        }
    }

    cancelClicked() {
    }

    saveClicked() {
    }

    initCrop() {
        jQuery('#cropme').cropper({
            aspectRatio: 1,
            viewMode: 3,
            autoCropArea: 1,
            zoomable: false
        });
    }

    saveCrop() {
        let containerData = jQuery('#cropme').cropper('getContainerData');
        let cropBoxData = jQuery('#cropme').cropper('getCropBoxData');
        this.setState({
            generating_thumb: true
        });
        let that = this;
        Meteor.call('cropUserImage', this.props.user._id, containerData, cropBoxData, function (err, ret) {
            that.setState({
                generating_thumb: false
            });
            if (err) {
                console.log(err);
            }
        });
    }

    componentDidUpdate() {
        this.initCrop();
    }

    componentDidMount() {
        this.initCrop();
    }

    sourceChanged(newSource) {
        Meteor.call('profilePicSourceChange', this.props.user._id, newSource);
    }
    onComplete(file_id) {
        jQuery('#cropme').cropper('destroy');
        Meteor.call('profilePicUploaded', this.props.user._id, file_id);
    }

    render() {
        let currentSource = (this.props.user.profile && this.props.user.profile.picSource) || 'none';
        return (
            <tr>
                <td className="alignTop"><strong>{this.props.label}</strong></td>
                <td className="wide-col">
                    {proPicSources.map((source) => <Radio1
                        checked={currentSource}
                        group="source"
                        label={source.label}
                        onChange={this.sourceChanged.bind(this)}
                        id={source.id}
                        key={source.id} />)}
                    {currentSource == 'upload' ?
                        <div>
                            <div className="row">
                                <div className="col s12 m6 l6 top-space">
                                    <div>
                                        <img id={(this.props.user.profile && this.props.user.profile.pic && "cropme") || "propicOriginal"} src={(this.props.user.profile && this.props.user.profile.pic && this.props.user.profile.pic.link) || 'http://www.gravatar.com/avatar/fdc10710b6ccaeb0c1c8eda5d08bb88e?d=mm'} />
                                    </div>
                                    <div>
                                        <FileUpload fileCollection={profilePics} setError={this.props.setError} onComplete={this.onComplete.bind(this)} />
                                    </div>
                                </div>
                                {(this.props.user.profile && this.props.user.profile.pic) ?
                                    <div className="col s12 m6 l6 top-space">
                                        <div className="center"><a className="btn" onClick={this.saveCrop.bind(this)}>Save Cropped Thumbnail</a></div>
                                        {(this.props.user.profile.pic.sqthumb) ?
                                            (this.state.generating_thumb) ?
                                                <div className="center top-space">
                                                    <div className="preloader-wrapper big active">
                                                        <div className="spinner-layer spinner-blue">
                                                            <div className="circle-clipper left">
                                                                <div className="circle"></div>
                                                            </div><div className="gap-patch">
                                                                <div className="circle"></div>
                                                            </div><div className="circle-clipper right">
                                                                <div className="circle"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="top-space center">
                                                    <img width="200" height="200" src={this.props.user.profile.pic.sqthumb} />
                                                    <br />
                                                    <img className="circle" width="200" height="200" src={this.props.user.profile.pic.sqthumb} />
                                                </div>
                                            :
                                            (this.state.generating_thumb) ?
                                                <div className="center top-space">
                                                    <div className="preloader-wrapper big active">
                                                        <div className="spinner-layer spinner-blue">
                                                            <div className="circle-clipper left">
                                                                <div className="circle"></div>
                                                            </div><div className="gap-patch">
                                                                <div className="circle"></div>
                                                            </div><div className="circle-clipper right">
                                                                <div className="circle"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <div className="center"><p>Thumbnail is not generated. Crop and click the button above to generate crop</p></div>
                                        }
                                    </div>
                                    : ''}
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