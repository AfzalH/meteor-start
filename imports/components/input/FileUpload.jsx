import React from 'react';
export default class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadProgress: false,
            uploadComplete: false
        }
    }
    fileChanged(e) {
        let that = this;
        if (e.target.files && e.target.files[0]) {
            var upload = this.props.fileCollection.insert({
                file: e.target.files[0],
                streams: 'dynamic',
                chunkSize: 'dynamic'
            }, false);

            upload.on('start', function () {
                that.setState({
                    uploadProgress: 0,
                    uploadComplete: false
                });
            });

            upload.on('progress', function (progress) {
                that.setState({
                    uploadProgress: progress
                })
            });

            upload.on('end', function (error, fileObj) {
                if (error) {
                    that.props.setError(error.reason);
                } else {
                    that.setState({
                        uploadComplete: true
                    });
                    setTimeout(function(){
                        that.setState({
                            uploadProgress: false
                        });
                    },3000);
                    that.props.onComplete(fileObj._id);
                }
            });
            upload.start();
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col s12 top-space">
                    {this.state.uploadProgress === false ?
                        <label htmlFor="propicinput">
                            <a className="btn">
                                <i className="material-icons left">file_upload</i>{this.props.buttonText}</a>
                            <input type="file" className="fixed-hidden" id="propicinput" onChange={this.fileChanged.bind(this)} />
                        </label>
                        :
                        <div>
                            <div className="progress">
                                <div className="determinate" style={{ width: (this.state.uploadProgress || 0) + '%' }}></div>
                            </div>
                            <div>Uploading: {this.state.uploadProgress || 0}% complete</div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}