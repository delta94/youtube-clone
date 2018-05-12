import './ChannelPage.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PlaylistContainer extends Component {
    render() {
        return (
            <Link to={'/playlist/'+this.props.id}>
            <div className="video-item">
                <div className="channel-playlist-image">
                    <div>
                        <p className="video-count">{this.props.videoCount}</p>
                        <p className="play-button"><i className="ion-ios-play" /></p>
                    </div>
                </div>
                <img src={'/images/thumbnails/' + this.props.videoId + '.png'} />
                <p>{this.props.name}</p>
                <h3 className="owner-tag">{this.props.owner}</h3>
                </div> 
            </Link>    
        );
    }
}

export default PlaylistContainer;
