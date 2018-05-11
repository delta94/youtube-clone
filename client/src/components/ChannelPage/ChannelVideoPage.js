import './ChannelPage.css';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import VideoContainer from './VideoContainer';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ChannelVideoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            channelInfo: {},
            subscribed: false,
            isLoading: true
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

    componentWillMount() {
        axios.get(`/api/videos/${this.props.match.params.username}`)
            .then((res) => {
                let videos = res.data;
                axios.get(`/api/checkForSubscriptions/${this.props.match.params.username}`)
                    .then((res) => {
                        let subscribed = res.data.result;
                        axios.get(`/api/channelInfo/` + this.props.match.params.username)
                            .then((res) => { 
                                let channelInfo = res.data;
                                console.log(channelInfo);
                                this.setState({ videos, subscribed, channelInfo , isLoading: false });
                        })
                })
        })
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
                    <div className="channel-video-container">
                        {this.state.videos.map((video) => <VideoContainer key={video.id} id={video.id} viewCount={video.viewCount} title={video.title} publishedAt={video.publishedAt}/>)}        
  
                </div>    
                </div>
            </div>    
          
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(ChannelVideoPage);
