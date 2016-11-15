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
            generating_thumb: false,
            thumb_preview: 'sq',
        }
    }
    thumbPreviewSquare() {
        this.setState({
            thumb_preview: 'sq'
        })
    }
    thumbPreviewCircle() {
        this.setState({
            thumb_preview: 'ci'
        })
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
        let user = this.props.user;
        let filteredProPicSources = proPicSources.filter(function (item) {
            if (item.id == 'facebook') {
                if (user.services && user.services.facebook && user.services.facebook.id) return true;
                return false;
            }
            else if (item.id == 'google') {
                if (user.services && user.services.google && user.services.google.id) return true;
                return false;
            }
            return true;
        });
        return (
            <tr>
                <td className="alignTop"><strong>{this.props.label}</strong></td>
                <td className="wide-col">
                    {filteredProPicSources.map((source) => <Radio1
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
                                    <div className="center">
                                        <img id={(this.props.user.profile && this.props.user.profile.pic && "cropme") || "propicOriginal"} src={(this.props.user.profile && this.props.user.profile.pic && this.props.user.profile.pic.link) || 'http://www.gravatar.com/avatar/fdc10710b6ccaeb0c1c8eda5d08bb88e?d=mm'} />
                                    </div>
                                    <div className="center">
                                        <FileUpload buttonText={(this.props.user.profile && this.props.user.profile.pic) ? "Click To Change" : "Click To Upload"} fileCollection={profilePics} setError={this.props.setError} onComplete={this.onComplete.bind(this)} />
                                    </div>
                                    {(this.props.user.profile && this.props.user.profile.pic) ?
                                        <div className="center top-space"><label><a className="btn" onClick={this.saveCrop.bind(this)}><i className="material-icons left">crop</i>Save Cropped Thumbnail</a></label></div>
                                        : ''
                                    }
                                </div>
                                {(this.props.user.profile && this.props.user.profile.pic) ?
                                    <div className="col s12 m6 l6 top-space">

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
                                                <div className="center">
                                                    <img width="200" height="200" className={(this.state.thumb_preview == 'ci') ? 'circle' : ''} src={this.props.user.profile.pic.sqthumb} />
                                                    <p className="caption">Thumbnail</p>
                                                    <div><a className={(this.state.thumb_preview == 'sq') ? 'btn disabled' : 'btn'} onClick={this.thumbPreviewSquare.bind(this)}>Square</a> <a className={(this.state.thumb_preview == 'ci') ? 'btn disabled' : 'btn'} onClick={this.thumbPreviewCircle.bind(this)}>Circle</a></div>
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
                                                <div className="center"><p>Thumbnail is not generated. Crop and click the 'Save Cropped Thumbnail' button to generate cropped thumbnail</p></div>
                                        }
                                    </div>
                                    : ''}
                            </div>
                        </div>
                        :
                        (currentSource == 'facebook') ?
                            <div className="top-space">
                                <img src={"http://graph.facebook.com/" + user.services.facebook.id + "/picture?width=200"} alt={user.services.facebook.name} />
                            </div>
                            :
                            (currentSource == 'google') ?
                                <div className="top-space">
                                    <img src={user.services.google.picture + "?sz=200"} alt={user.services.google.name} />
                                </div>
                                :
                                ''
                    }

                </td>
            </tr >
        );
    }
}