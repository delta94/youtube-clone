import './ChannelPage.css';
import tick from './images/tick.png';
import watchLater from './images/watch_later.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class VideoContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watchedLater: false
        }

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

    render() {
        let btn = this.state.watchedLater ? <img onClick={this.handleWatchLater} id="watch-later-btn" src={tick} /> :
            <img onClick={this.handleWatchLater} id="watch-later-btn" src={watchLater} />
        return (
            <div className="video-item">
                <Link to={'/video/' + this.props.id} >
                    <img src={'/images/thumbnails/' + this.props.id + '.png'} />
                    <p>{this.props.title}</p>
                    <h4>{this.props.viewCount} views • {this.props.publishedAt}</h4>
                </Link>
                {btn}
            </div>    

            
        )
  }
}
