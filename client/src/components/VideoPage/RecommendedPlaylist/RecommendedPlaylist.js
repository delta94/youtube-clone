import '../RecommendedVideo/RecommendedVideo.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class RecommendedPlaylist extends Component {
    render() {
        return (
            <div className='video_box'>
                <Link to="/playlist/4">
                    <div className="playlist-image-container">
                        <div className="playlist-image">
                            <div>
                                <p>50</p>
                                <p><i className="ion-ios-play" /></p>
                            </div>
                        </div>
                        <img className='video_box_img' src={'/images/thumbnails/' + this.props.id + '.png'} />
                    </div>
                    <h5 className='video_box_title'>{this.formatTitle(this.props.title)}</h5>
                    <h6 className='video_box_channel'>{this.formatChannelTitle(this.props.channelTitle)}</h6>
                    <p className='video_box_views' > {this.props.viewCount} views </p>
                </Link>
            </div>
        );
    }
}

export default RecommendedPlaylist;
