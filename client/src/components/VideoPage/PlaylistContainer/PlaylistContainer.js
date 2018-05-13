import '../PlaylistPage.css';
import './PlaylistContainer.css';
import add from './images/add.png';
import added from './images/added.png';
import React, { Component } from 'react';
import PlaylistVideoItem from './PlaylistVideoItem';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

class PlaylistContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasAdded: undefined
        }
        
        this.handleUnsavePlaylist = this.handleUnsavePlaylist.bind(this);
        this.handleSavePlaylist = this.handleSavePlaylist.bind(this);
    }

    handleSavePlaylist() {
        axios.post('/api/savePlaylist/' + this.props.playlistId);
        this.setState((prev) => ({ hasAdded: !prev.hasAdded }));
    }

    handleUnsavePlaylist() {
        axios.delete('/api/savePlaylist/' + this.props.playlistId);
        this.setState((prev) => ({ hasAdded: !prev.hasAdded }));
    }

    componentDidMount() {
         
        axios.get(`/api/checkPlaylistOwner/${this.props.playlistId}`)
            .then((res) => {
                 
                this.setState({ isOwner: res.data.result });
            });
        axios.get(`/api/checkSavePlaylist/${this.props.playlistId}`)
            .then((res) => {
                this.setState({ hasAdded: res.data.result });
        })
    }

    renderAddButton() {
        if (this.state.isOwner) return null;

        if (this.state.hasAdded === true) {
            return <button onClick={this.handleUnsavePlaylist}><img src={added} /></button>
        } else if (this.state.hasAdded === false) {
            return <button onClick={this.handleSavePlaylist}><img src={add} /></button>     
        }
    }

    render() {
         
        return (
            <div className="playlist-container">
                <div className="playlist-header">
                    <p>{this.props.name}</p>
                    <Link to={'/channel/' + this.props.owner + '/home'}> <h3>{this.props.owner}</h3> </Link>
                    {this.renderAddButton()}
                </div>    
                <div className="playlist-video-container">
                    {this.props.videos.map((video) => <PlaylistVideoItem playlistId={this.props.playlistId} isPlaying={this.props.isPlaying == video.id} key={video.id} title={video.title} owner={video.owner} id={video.id}/>)}
                </div>    
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => ({ auth });

const mapStateToProps1 = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PlaylistContainer);
