import './RecommendedVideo.css';
import watchLater from './images/watch_later.png';
import tick from './images/tick.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RecommendedVideo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watchedLater: false
        }

        this.getViews = this.getViews.bind(this);
        this.handleWatchLater = this.handleWatchLater.bind(this);
    }

    componentDidMount() {
        axios.get('/api/checkWatchLater/' + this.props.id)
            .then((res) => this.setState({ watchedLater: res.data.result }));
    }

    handleWatchLater() {
        if (this.state.watchedLater) return;
        axios.post('/api/watchLater/' + this.props.id)
            .then((res) => this.setState({ watchedLater: true }));
    }

    getViews(index) {
        return this.state.views[index].toLocaleString();
    }

    formatTitle(str) {
        if (str.length > 75) {
            str = str.split('').slice(0, 75).join('') + '...';
        }
        return str;
    }

    formatChannelTitle(str) {
        if (str.length > 28) {
            str = str.split('').slice(0, 28).join('') + '...';
        }
        return str;
    }

    render() {
        let btn = this.state.watchedLater ? <img onClick={this.handleWatchLater} id="watch-later-btn" src={tick} /> :
            <img onClick={this.handleWatchLater} id="watch-later-btn" src={watchLater} />

        return (
            <div className='video_box'>
                <Link to={'/video/' + this.props.id}>
                    <div key={this.props.id} >
                        <img className='video_box_img' src={'/images/thumbnails/' + this.props.id + '.png'} />
                        <h5 className='video_box_title'>{this.props.title}</h5>
                        <h6 className='video_box_channel'>{this.props.channelTitle}</h6>
                        <p className='video_box_views' > {this.props.viewCount} views </p>
                    </div>
                </Link>
                {btn}
            </div>
        );
    }
}

export default RecommendedVideo;
