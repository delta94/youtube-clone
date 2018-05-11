import './ChannelPage.css';
import React, { Component } from 'react';

class PlaylistContainer extends Component {
    render() {
        return (
            <div className="video-item">
                <div className="channel-playlist-image">
                    <div>
                        <p>50</p>
                        <p><i className="ion-ios-play" /></p>
                    </div>
                </div>
                <img src={'/images/thumbnails/' + '6' + '.png'} />
                <p>aslfjksadlfk</p>
            </div> 
        );
    }
}

export default PlaylistContainer;
