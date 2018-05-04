import React, { Component } from 'react';
import PublishForm from './PublishForm/PublishForm';
import UploadForm from './UploadForm/UploadForm';
import axios from 'axios';
import { connect } from 'react-redux';

class UploadPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: true,
            videoName: '',
            isLoading: true,
            description: '',
            state: 0,
            tag: '',
            imageUrl: undefined,
            id: '',
            message: ''
        }

        this.handleInputFileOnChange = this.handleInputFileOnChange.bind(this);
        this.handleCancelButtonOnClick = this.handleCancelButtonOnClick.bind(this);
        this.handleVideoNameOnChange = this.handleVideoNameOnChange.bind(this);
        this.handleDesciptionOnChange = this.handleDesciptionOnChange.bind(this);
        this.handleStateOnChange = this.handleStateOnChange.bind(this);
        this.handleTagOnChange = this.handleTagOnChange.bind(this);
        this.handlePublishButtonOnClick = this.handlePublishButtonOnClick.bind(this);
    }

    componentWillMount() {
        this.setState({ imageUrl: undefined });
    }

    handleInputFileOnChange(e) {
        this.setState({ toggle: false, videoName: e.target.files[0].name, isLoading:true });
        var formData = new FormData();
        var imagefile = document.querySelector('#file');
        formData.append("video", imagefile.files[0]);
        formData.append("username", this.props.auth.username);
        console.log(formData);
        axios.post('/upload/video', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.setState({ isLoading: false, imageUrl: res.data.imageUrl, id: res.data.id });
        });
    }

    handleCancelButtonOnClick() {
        console.log(this.state.id);
        this.setState({ toggle: true, imageUrl: undefined, id: undefined, videoName: '', description:'', tag:'' });
        axios.delete('/user/video/' + this.state.id);
    }

    handleVideoNameOnChange(e) {
        this.setState({ videoName: e.target.value });
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

    handlePublishButtonOnClick() {
        if (!this.state.videoName || !this.state.description || !this.state.tag) {
            this.setState({ message: 'Form is missing!' });
            setTimeout(() => {
                this.setState({ message: '' });
            }, 1000);
        } else {
            axios.put('/user/video/' + this.props.id, {
                name: this.state.videoName,
                desc: this.state.description,
                state: this.state.state,
                tag: this.state.tag,
                id: this.state.id
            }).then((res) => {
                this.props.history.push('/video/' + this.state.id);
            });
        }
    }

    render() {
        return (
            <div>
                {<h1>{this.state.message}</h1> || <h1>&ensp;</h1>}
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
                        handlePublishButtonOnClick={this.handlePublishButtonOnClick}
                        videoName={this.state.videoName}
                    />
                }
            </div>
        );
    }
}

var mapStateToProps = (state) => {
    console.log('inside uploadpage: ', state.auth);
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UploadPage);
