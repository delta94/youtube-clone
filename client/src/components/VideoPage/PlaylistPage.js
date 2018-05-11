import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SubscriptionNotify from './../SubscribeNotify/SubscribeNotify';
import UnsubscribeNotify from './../UnsubscribeNotify/UnsubscribeNotify';
import VideoTitleContainer from './VideoTitleContainer/VideoTitleContainer.js';
import ShareLinkBox from './ShareLinkBox/ShareLinkBox.js';
import VideoDescriptionBox from './VideoDescriptionBox/VideoDescriptionBox.js';
import CommentsContainer from './CommentsContainer/CommentsContainer.js';
import RecommendedVideosContainer from './RecommendedVideosContainer/RecommendedVideosContainer.js';
import PlaylistContainer from './PlaylistContainer/PlaylistContainer';

import './PlaylistPage.css';

class PlaylistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoInfo: {},
            videoList: [],
            videoId: props.videoId,
            uniqueId: Math.floor(Math.random() * 999),
            notify: false,
            unsubNotify: false,
            showShareBox: false,
            isLoading: true,
            likeStatus: 0,
            isPlaying: 0,
            playlistVideos: [],
            playlistId: props.playlistId,
            playlistName: '',
            playlistOwner: ''
        }

        this.handleDislike = this.handleDislike.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleUnsubscription = this.handleUnsubscription.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleShowSharebox = this.handleShowSharebox.bind(this);
        this.fetchVideoInfo = this.fetchVideoInfo.bind(this);
    }

    componentWillMount() {
        let playlistId = this.props.match.params.playlistId;
        axios.get(`/api/videosForPlaylist/${playlistId}`).then((res) => {
            let firstVideoId = this.props.match.params.videoId || res.data[0].id;
            console.log('will mount', firstVideoId, 'aa');
            this.setState({ isPlaying: firstVideoId, playlistVideos: res.data, playlistId: playlistId });
            axios.get(`/api/playlist/${playlistId}`).then((res) => this.setState({ playlistName: res.data.name, owner: res.data.owner }));
            axios.get(`/api/video/${firstVideoId}`)
                .then(res => {
                    let videoInfo = res.data;
                    axios.post('/api/view/' + firstVideoId);
                    axios.get('/api/checkLike/' + firstVideoId).then((res) => {
                        console.log('checklike', res);
                        this.setState({ videoInfo: videoInfo, isLoading: false, likeStatus: res.data.result });
                    });
                    axios.get(`/api/recommendedVideo/` + firstVideoId)
                        .then(RecommendedVideos => {
                            console.log('recommended: ', RecommendedVideos.data);
                            this.setState({
                                videoList: RecommendedVideos.data
                            })
                        });
                }).catch ((err) => this.props.history.push('/404'));
        }).catch((err) => this.props.history.push('/404'));
        document.body.scrollTop = 0;
    }

    fetchVideoInfo(videoId) {

    } 

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            let playlistId = this.props.match.params.playlistId;
            axios.get(`/api/videosForPlaylist/${playlistId}`).then((res) => {
                let firstVideoId = this.props.match.params.videoId || res.data[0].id;
                console.log('will mount', firstVideoId, 'aa');
                this.setState({ isPlaying: firstVideoId, playlistVideos: res.data, playlistId: playlistId });
                axios.get(`/api/playlist/${playlistId}`).then((res) => this.setState({ playlistName: res.data.name, owner: res.data.owner }));
                axios.get(`/api/video/${firstVideoId}`)
                    .then(res => {
                        let videoInfo = res.data;
                        axios.post('/api/view/' + firstVideoId);
                        axios.get('/api/checkLike/' + firstVideoId).then((res) => {
                            console.log('checklike', res);
                            this.setState({ videoInfo: videoInfo, isLoading: false, likeStatus: res.data.result });
                        });
                        axios.get(`/api/recommendedVideo/` + firstVideoId)
                            .then(RecommendedVideos => {
                                console.log('recommended: ', RecommendedVideos.data);
                                this.setState({
                                    videoList: RecommendedVideos.data
                                })
                            });
                    });
            });
            document.body.scrollTop = 0;
        }
    }

    handleShowSharebox() {
        this.setState({
            showShareBox: !this.state.showShareBox
        })
    }

    handleLike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            likeCount: Number(this.state.videoInfo.statistics.likeCount) - 1
                        })
                    }),
                    likeStatus: 0
                });
            })
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/like/' + this.state.videoId).then((res) => {
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            likeCount: Number(this.state.videoInfo.statistics.likeCount) + 1
                        })
                    }),
                    likeStatus: 1
                });
            })
        } else {
            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                axios.post('/api/like/' + this.state.videoId).then((res) => {
                    this.setState({
                        videoInfo: Object.assign({}, this.state.videoInfo, {
                            statistics: Object.assign({}, this.state.videoInfo.statistics, {
                                likeCount: Number(this.state.videoInfo.statistics.likeCount) + 1,
                                dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) - 1
                            })
                        }),
                        likeStatus: 1
                    });
                })
            });
        }
    }

    handleDislike() {
        if (this.state.likeStatus === 1) {

            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                axios.post('/api/dislike/' + this.state.videoId).then((res) => {
                    this.setState({
                        videoInfo: Object.assign({}, this.state.videoInfo, {
                            statistics: Object.assign({}, this.state.videoInfo.statistics, {
                                likeCount: Number(this.state.videoInfo.statistics.likeCount) - 1,
                                dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) + 1
                            })
                        }),
                        likeStatus: -1
                    });
                })
            });
        } else if (this.state.likeStatus === 0) {
            axios.post('/api/dislike/' + this.state.videoId).then((res) => {
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) + 1
                        })
                    }),
                    likeStatus: -1
                });
            })
        } else {

            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) - 1
                        })
                    }),
                    likeStatus: 0
                });
            })
        }
    }

    handleSubscription(str) {
        this.setState({
            notify: true,
        })
        setTimeout(() => {
            this.setState({
                notify: false,
            })
        }, 2500)
    }

    handleUnsubscription(str) {
        this.setState({
            unsubNotify: true,
        })
        setTimeout(() => {
            this.setState({
                unsubNotify: false,
            })
        }, 2500)
    }

    render() {
        console.log('00', this.props.match.params);
        let notifyPrompt = null;
        if (this.state.notify) {
            notifyPrompt = <SubscriptionNotify />
        }
        let unsubNotifyPrompt = null;
        if (this.state.unsubNotify) {
            unsubNotifyPrompt = <UnsubscribeNotify />
        }
        let shareLinkBox = null;
        if (this.state.showShareBox) {
            shareLinkBox = <ShareLinkBox
                videoId={this.state.videoInfo.id}
            />
        }

        if (this.state.isLoading) {
            return null;
        } else {
            console.log('is playing: ', this.state.isPlaying);
            console.log('playlist id ', this.state.playlistId);
            return (
                <section className='videopage_main_container'>
                    {notifyPrompt}
                    {unsubNotifyPrompt}
                    <section className='playlist-iframe_placeholder'>

                        <div className='iframe_placeholder'>
                            <video
                                className='iframe'
                                allowFullScreen
                                src={'/watch/' + this.state.isPlaying}
                                autoPlay
                                controls>
                            </video>
                            <PlaylistContainer name={this.state.playlistName} owner={this.state.owner} playlistId={this.state.playlistId} videos={this.state.playlistVideos} isPlaying={this.state.isPlaying}/>
                        </div>
                        <VideoTitleContainer
                            snippet={this.state.videoInfo.snippet || { title: '' }}
                            videoId={this.state.videoInfo.id}
                            statistics={this.state.videoInfo.statistics || {}}
                            handleLike={this.handleLike}
                            handleDislike={this.handleDislike}
                            notify={this.handleSubscription}
                            unsubNotify={this.handleUnsubscription}
                            showShareBox={this.handleShowSharebox}
                            likeStatus={this.state.likeStatus}
                        />

                        {shareLinkBox}

                        <VideoDescriptionBox
                            snippet={this.state.videoInfo.snippet || {}} />

                        <CommentsContainer
                            videoId={this.state.videoInfo.id} />

                    </section>

                    <section className='playlist-rightside_videos_wrapper'>
                        <RecommendedVideosContainer
                            videoList={this.state.videoList || [{}]} />
                    </section>

                </section>
            );
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        videoId: ownProps.match.params.videoId
    }
}

export default connect(mapStateToProps, {})(PlaylistPage);