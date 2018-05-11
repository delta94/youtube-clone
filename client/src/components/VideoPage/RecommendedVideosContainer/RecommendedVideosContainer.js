import './RecommendedVideosContainer.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecommendedVideo from '../RecommendedVideo/RecommendedVideo';
import RecommendedPlaylist from '../RecommendedPlaylist/RecommendedPlaylist';

class RecommendedVideosContainer extends Component {
    render() {
        let videos = this.props.videoList;
        return (
            <div className='more_videos_container'>
                { 
                videos.map( (video) => {
                        return <RecommendedVideo
                            key={video.id}    
                            id={video.id}
                            title={video.title}
                            channelTitle={video.channelTitle}
                            viewCount={video.viewCount}
                        />
                }) 
                }
            </div>
        );
    }
}

export default RecommendedVideosContainer;

