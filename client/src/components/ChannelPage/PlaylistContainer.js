import './ChannelPage.css';
import React, { Component } from 'react';
import play from './images/play.png';
import { Link } from 'react-router-dom';

class PlaylistContainer extends Component {
    render() {
        return (
            <Link to={'/playlist/'+this.props.id}>
            <div className="video-item">
                <div className="channel-playlist-image">
                    <div>
                        <p className="video-count">{this.props.videoCount}</p>
                            <div className="play-button"><img src={play}/></div>
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
