import './RecommendedVideosContainer.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecommendedVideo from '../RecommendedVideo/RecommendedVideo';
import RecommendedPlaylist from '../RecommendedPlaylist/RecommendedPlaylist';

class RecommendedVideosContainer extends Component {
    render() {
        let recommendedList = this.props.recommendedList;
        return (
            <div className='more_videos_container'>
                { 
                    recommendedList.map(
                        (item) => {
                        if (typeof(item.playlist_id) === 'undefined') {
                        return <RecommendedVideo
                            key={item.id}    
                            id={item.id}
                            title={item.title}
                            channelTitle={item.channelTitle}
                            viewCount={item.viewCount}/>;
                        }
                        else {
                            return <RecommendedPlaylist
                                key={item.playlist_id + item.name}
                                videoCount={item.videoCount}
                                videoId={item.video_id}
                                owner={item.owner}
                                name={item.name}
                            />;
                        }
                    }) 
                }
            </div>
        );
    }
}

export default RecommendedVideosContainer;

