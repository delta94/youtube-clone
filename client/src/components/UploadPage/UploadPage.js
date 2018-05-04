import React, { Component } from 'react';
import PublishForm from './PublishForm/PublishForm';
import UploadForm from './UploadForm/UploadForm';
import axios from 'axios';

class UploadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: true,
            videoName: '',
            isLoading: true,
            description: '',
            state: '',
            tag: '',
            imageUrl: undefined,
            id: ''
        }

        this.handleInputFileOnChange = this.handleInputFileOnChange.bind(this);
        this.handleCancelButtonOnClick = this.handleCancelButtonOnClick.bind(this);
    }

    componentWillMount() {
        this.setState({ imageUrl: undefined });
    }

    handleInputFileOnChange(e) {
        this.setState({ toggle: false, videoName: e.target.files[0].name, isLoading:true });
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("video", imagefile.files[0]);
        console.log(formData);
        axios.post('/upload/video', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.setState({ isLoading: false, imageUrl: res.data.imageUrl, id: res.data.id });
        });
    }

    handleCancelButtonOnClick() {
        console.log(this.state.id);
        this.setState({ toggle: true, imageUrl: undefined, id: undefined });
        axios.delete('user/video/' + this.state.id);
    }

    handleVideoNameOnChange(e) {
        this.setState({ name: e.target.value });
    }

    handleDesciptionOnChange(e) {
        this.setState({ description: e.target.value });
    }

    handleStateOnChange(e) {
        this.setState({ state: e.target.value})
    }

    handleTagOnChange(e) {
        this.setState({ tag: e.target.value })
    }

    render() {
        return (
            <div>
                {this.state.toggle ?
                    <UploadForm handleInputFileOnChange={this.handleInputFileOnChange} />
                    :
                    <PublishForm videoName={this.state.videoName}
                        handleCancelButtonOnClick={this.handleCancelButtonOnClick}
                        isLoading={this.state.isLoading}
                        imageUrl={this.state.imageUrl}
                        handleVideoNameOnChange={this.handleVideoNameOnChange}
                        handleDesciptionOnChange={this.handleDesciptionOnChange}
                        handleStateOnChange={this.handleStateOnChange}
                        handleTagOnChange={this.handleTagOnChange}
                    />
                }
            </div>
        );
    }
}

export default UploadPage;
