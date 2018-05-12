import './PlaylistContainer.css';
import watchLater from '../RecommendedVideo/images/watch_later.png';
import tick from '../RecommendedVideo/images/tick.png';
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PlaylistVideoItem extends Component {
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
        let btn = this.state.watchedLater ? <img onClick={this.handleWatchLater} id="video-item-watch-later-btn" src={tick}/>
          : <img onClick={this.handleWatchLater} id="video-item-watch-later-btn" src={watchLater} />
      
    return (
      <div className="video-item-outer-container">
            <Link to={`/playlist/${this.props.playlistId}/video/${this.props.id}`}>
                <div className="playlist-video-item">
                        <div className="play-btn">
                        {this.props.isPlaying && <i className="ion-play"></i>}
                        </div>
                        <img src={`/images/thumbnails/${this.props.id}.png`}/>
                        <div className="playlist-video-detail">
                            <div className="playlist-video-title">{this.props.title}</div>
                        <div className="playlist-channel-title">{this.props.owner}</div>
                    </div>
            </div>
            </Link>
            {btn}
      </div>
    );
  }
}

export default PlaylistVideoItem;
