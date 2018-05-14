import './ChannelPage.css';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import VideoContainer from './VideoContainer';
import PlaylistContainer from './PlaylistContainer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ChannelVideoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            channelInfo: {},
            subscribed: false,
            isLoading: true,
            savedPlaylist: [],
            createdPlaylist: []
        }

        this.subscribeTo = this.subscribeTo.bind(this);
        this.unsubscribeTo = this.unsubscribeTo.bind(this);
    }

    subscribeTo() {
        axios.post(`/api/subscribe/${this.props.match.params.username}`).then(() => {
            this.setState((prev) => ({
                subscribed: true,
                subscribersCount: prev.subscribersCount + 1
            }));
        });
    }

    unsubscribeTo() {
        axios.delete(`/api/unsubscribe/${this.props.match.params.username}`).then(() => {
            this.setState((prev) => ({
                subscribed : false,
                subscribersCount: prev.subscribersCount - 1
            }));
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            this.smoothScrollToTop();
            let videos, subscribed, channelInfo, savedPlaylist, createdPlaylist;
            axios.get(`/api/videos/${this.props.match.params.username}`)
                .then((res) => {
                    videos = res.data;
                    return axios.get(`/api/checkForSubscriptions/${this.props.match.params.username}`);
                })
                .then((res) => {
                    subscribed = res.data.result;
                    return axios.get(`/api/channelInfo/` + this.props.match.params.username);
                })
                .then((res) => {
                    channelInfo = res.data;
                    return axios.get(`/api/playlists?type=my`);
                })
                .then((res) => {
                    createdPlaylist = res.data;
                    return axios.get(`/api/playlists?type=saved`);
                })
                .then((res) => {
                    savedPlaylist = res.data;
                    console.log('save: ', savedPlaylist)
                    this.setState({ videos, subscribed, channelInfo, isLoading: false, savedPlaylist, createdPlaylist });
                });
        }
    }

    smoothScrollToTop() {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);

        while (top > 0) {
            setTimeout(() => {
                window.scrollTo(0, top);
                top = top - 15;
            }, 10);
        }
    }

    componentWillMount() {
        let videos, subscribed, channelInfo, savedPlaylist, createdPlaylist;
        axios.get(`/api/videos/${this.props.match.params.username}`)
            .then((res) => {
                videos = res.data;
                return axios.get(`/api/checkForSubscriptions/${this.props.match.params.username}`);
            })
            .then((res) => {
                subscribed = res.data.result;
                return axios.get(`/api/channelInfo/` + this.props.match.params.username);
            })
            .then((res) => {
                channelInfo = res.data;
                return axios.get(`/api/playlists?type=my`);
            })
            .then((res) => {
                createdPlaylist = res.data;
                return axios.get(`/api/playlists?type=saved`);
            })
            .then((res) => {
                if (res.data[0]) savedPlaylist = res.data;
                else savedPlaylist = [];
                 
                this.setState({ videos, subscribed, channelInfo, isLoading: false, savedPlaylist, createdPlaylist });
            });
    }

    renderSubscribeButton() {
        if (!this.props.auth) return null;
        if (this.props.auth.username == this.props.match.params.username) return <button className="channel-edit-btn" onClick={() => console.log('edit')}>EDIT</button>
        return !this.state.subscribed ? <button className="channel-subscribe-btn" onClick={this.subscribeTo}>SUBSCRIBE</button> :
            <button className="channel-subscribed-btn" onClick={this.unsubscribeTo}>SUBSCRIBED</button>
    }

    render() {
        if (this.state.isLoading) return null;
        return (
            <div>
        	<div className="channel-page">
				<div className="channel-header">
					<Avatar name={this.props.match.params.username} size={65} round={true} textSizeRatio={1.75}/>
					<div className="channel-name-container">
						<div>	
						<h3><b>{this.state.channelInfo.channelTitle}</b></h3>
							<h4>{this.state.channelInfo.subscriberCount} subscribers</h4>
							</div>
					</div>
					<div className="channel-subscribe-button-container">
					<div>	
                                {this.renderSubscribeButton()}
						</div>	
					</div>	
				</div>	
				<div className="channel-navigation">
					<ul>
                            <li><NavLink activeClassName="channel-navigation-active" to={'/channel/' + this.props.match.params.username + '/home'}>HOME</NavLink></li>
						<li><a href="channel">VIDEOS</a></li>
						<li><a href="contact">CHANNELS</a></li>
						<li><a href="
						about">ABOUT</a></li>
						</ul>
                    </div>

                    {this.state.videos.length == 0 && this.state.createdPlaylist.length == 0 && this.state.savedPlaylist.length == 0 ?
                        <p className="sorry-message">This channel do not have any contents</p> :
                        <div>
                            <section>
                                {this.state.videos.length > 0 && <div><p> Uploads </p>
                                    <div className="channel-video-container">
                                    {this.state.videos.map((video) =>
                                        <VideoContainer
                                            key={video.id} id={video.id}
                                            viewCount={video.viewCount}
                                            title={video.title}
                                            publishedAt={video.publishedAt} />)}
                                </div></div>}
 
                            </section>

                            <section>
                                {
                                    this.state.createdPlaylist.length > 0 &&
                                    <div>
                                        <p> Created playlists </p>
                                        <div className="channel-video-container">
                                            {this.state.createdPlaylist.map((playlist) =>
                                                <PlaylistContainer
                                                    key={playlist.playlist_id} id={playlist.playlist_id}
                                                    videoCount={playlist.videoCount}
                                                    name={playlist.name}
                                                    videoId={playlist.video_id} />)}

                                        </div></div>
                                }

                            </section>

                            <section>
                                {this.state.savedPlaylist.length > 0 && <div><p> Saved playlists</p>
                                    <div className="channel-video-container">
                                        {
                                            this.state.savedPlaylist.map((playlist) =>
                                                <PlaylistContainer
                                                    key={playlist.playlist_id} id={playlist.playlist_id}
                                                    videoCount={playlist.videoCount}
                                                    name={playlist.name}
                                                    videoId={playlist.video_id}
                                                    owner={playlist.owner}
                                                />
                                            )
                                        }
                                    </div></div>}

                            </section>        
                        </div>    
                }
                </div>
            </div>    
          
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(ChannelVideoPage);
