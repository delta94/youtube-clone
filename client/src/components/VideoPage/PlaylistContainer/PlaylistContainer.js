import '../PlaylistPage.css';
import './PlaylistContainer.css';
import add from './images/add.png';
import React, { Component } from 'react';
import PlaylistVideoItem from './PlaylistVideoItem';
import { Link } from 'react-router-dom';

class PlaylistContainer extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div className="playlist-container">
                <div className="playlist-header">
                    <p>{this.props.name}</p>
                    <Link to={'/channel/' + this.props.owner + '/home'}> <h3>{this.props.owner}</h3> </Link>
                    <button><img src={add} /></button>
                </div>    
                <div className="playlist-video-container">
                    {this.props.videos.map((video) => <PlaylistVideoItem playlistId={this.props.playlistId} isPlaying={this.props.isPlaying == video.id} key={video.id} title={video.title} owner={video.owner} id={video.id}/>)}
                </div>    
            </div>
        );
    }
}

export default PlaylistContainer;
