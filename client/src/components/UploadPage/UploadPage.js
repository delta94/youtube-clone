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
            name: '',
            isLoading: true,
            description: '',
            state: 0,
            tag: '',
            imageUrl: undefined,
            id: ''
        }

        this.handleInputFileOnChange = this.handleInputFileOnChange.bind(this);
        this.handleCancelButtonOnClick = this.handleCancelButtonOnClick.bind(this);
        this.handleVideoNameOnChange = this.handleVideoNameOnChange.bind(this);
        this.handleDesciptionOnChange = this.handleDesciptionOnChange.bind(this)
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
        formData.append("username", this.props.auth.username)
         
        axios.post('user/upload/video', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            this.setState({ isLoading: false, imageUrl: res.data.imageUrl, id: res.data.id });
        });
    }

    handlePublishButtonOnClick() {
         
        axios.put('/user/video/' + this.state.id, {
            state: this.state.state,
            name: this.state.name,
            desc: this.state.description,
            tag: this.state.tag,
            id: this.state.id
        }).then((res) => {
            this.props.history.push('/video/' + this.state.id);
        });
    }

    handleCancelButtonOnClick() {
         
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
                        handlePublishButtonOnClick={this.handlePublishButtonOnClick}    
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

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UploadPage);
