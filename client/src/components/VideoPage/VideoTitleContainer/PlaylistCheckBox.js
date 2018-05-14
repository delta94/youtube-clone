import './VideoTitleContainer.css';
import React, { Component } from 'react';
import axios from 'axios';

export default class PlaylistCheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        }

        this.handleInputOnChange = this.handleInputOnChange.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/checkVideoInPlaylist?pid=${this.props.playlistId}&vid=${this.props.videoId}`)
            .then((res) => this.setState({ checked: res.data.result }));
    }

    handleInputOnChange() {
         
        if (this.state.checked) {
            this.setState((prev) => ({ checked: !prev.checked }));
            axios.post(`/api/deleteVideo`, {
                pid: this.props.playlistId,
                vid: this.props.videoId
            });
        } else {
            this.setState((prev) => ({ checked: !prev.checked }));
            axios.post(`/api/insertVideo`, {
                pid: this.props.playlistId,
                vid: this.props.videoId
            });
        }
    }

    render() {
        return (
            <div className="checkbox-item">
                <label>
                    <div>    
                        <input onChange={this.handleInputOnChange} type="checkbox" name="vehicle" checked={this.state.checked} /><p className="dropdown-playlist-name" >{this.props.name}</p>
                    </div>    
                </label>
            </div>
        )
    }
}
