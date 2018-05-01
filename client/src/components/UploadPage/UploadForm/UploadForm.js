import './UploadForm.css';
import upload from '../images/upload_cloud.png';
import React, { Component } from 'react';

class UploadForm extends Component {
    render() {
        return (
            <div className="upload-form">
                <div className="upload-btn-wrapper">
                    <button>
                        <img src={upload} width={300} height={300} />
                        <h3> Select files to upload </h3>
                        <h4>Or drag and drop video files</h4>
                    </button>
                    <input type="file" name="video" id="file" onChange={this.props.handleInputFileOnChange}/>
                </div>
            </div>
        );
    }
}

export default UploadForm;
