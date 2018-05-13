import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import bullet from './../../../Header/img/bullet.png';
import './ChannelContainer.css';
import watchLater from '../../../VideoPage/RecommendedVideo/images/watch_later.png';
import tick from '../../../VideoPage/RecommendedVideo/images/tick.png';
import Clock from '../../../Clock/Clock';

class VideoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            viewCount: 0,
            publishedAt: 0,
            channelTitle: '',
            watchedLater: undefined
        }
    }

    componentWillMount() {
        axios.get('/api/video/' + this.props.id)
            .then((res) => this.setState({
                channelTitle: res.data.snippet.channelTitle,
                title: res.data.snippet.title,
                viewCount: res.data.statistics.viewCount,
                publishedAt: res.data.snippet.publishedAt,
                isLoading: false
            }));
        axios.get('/api/checkWatchLater/' + this.props.id)
            .then((res) => this.setState({ watchedLater: res.data.result }));
    }

    render() {
        if (this.state.isLoading) return null;
        console.log('watch later', this.state.watchedLater);
        return (
            <Link to={'/video/' + this.props.id} >
                <div className="videos_info_container">
                    <img id="video_info_img" src={`/images/thumbnails/` + this.props.id + '.png'} />
                    <h1>{this.state.title}</h1>
                    <div className="watch_container">
                        {
                            this.state.watchedLater ?
                                <img id="watch_later" src={watchLater} /> :
                                <img id="watch_later" src={tick} /> 
                    }    
                        
                    </div>
                    <p className="channel-title">{this.state.channelTitle}</p>
                    <ul>
                        <li>{this.state.viewCount} views </li>
                        <li><img src={bullet} /></li>
                        <li><Clock date={this.state.publishedAt} /></li>
                    </ul>
                </div>
            </Link>
        );
    }
}

export default VideoContainer;
