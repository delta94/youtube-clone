import './WatchLater.css';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Clock from '../Clock/Clock';

class WatchLater extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            isLoading: true
        }
    }

    componentWillMount() {
        axios.get('/api/watchLater')
            .then((res) => this.setState((prev) => ({ isLoading: !prev.isLoading, videos: res.data })));
    }

    render() {
        if (this.state.isLoading) return null;
        console.log('->', this.state.videos);
        return (
            <div id="watchlater-container">
                {this.state.videos.map((video) => {
                    return <div key={video.id} id='search_video_container'>
                        <Link to={'/video/' + video.id}><div id="video_display_container">
                            <img id="search_video_img" src={"/images/thumbnails/" + video.id + ".png"} />
                        </div></Link>
                        <div className="search_words_container">
                            <Link to={'/video/' + video.id}><h1 id="search_video_title">{video.title}</h1></Link>
                            <h2 id="search_video_channel">{video.channelTitle}</h2>
                            <ul>
                                <li><Clock date={video.publishedAt} /></li>
                                <li>•</li>
                                <li>{video.viewCount} views</li>
                            </ul>
                            <p id="search_video_desc">{video.description}</p>
                        </div>
                    </div>
                }
                )}
            </div>
        );
    }
}

export default WatchLater;
