import React, {
    Component
} from 'react';
import {
    connect
} from 'react-redux';
import axios from 'axios';

import SubscriptionNotify from './../SubscribeNotify/SubscribeNotify';
import UnsubscribeNotify from './../UnsubscribeNotify/UnsubscribeNotify';
import VideoTitleContainer from './VideoTitleContainer/VideoTitleContainer.js';
import ShareLinkBox from './ShareLinkBox/ShareLinkBox.js';
import VideoDescriptionBox from './VideoDescriptionBox/VideoDescriptionBox.js';
import CommentsContainer from './CommentsContainer/CommentsContainer.js';
import RecommendedVideosContainer from './RecommendedVideosContainer/RecommendedVideosContainer.js';

import './VideoPage.css';

class VideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoInfo: {},
            recommendedList: [],
            videoId: props.videoId,
            uniqueId: Math.floor(Math.random() * 999),
            notify: false,
            unsubNotify: false,
            showShareBox: false,
            isLoading: true,
            likeStatus: 0
        }

        this.handleDislike = this.handleDislike.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.handleUnsubscription = this.handleUnsubscription.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleShowSharebox = this.handleShowSharebox.bind(this);
    }

    componentWillMount() {
        axios.get(`/api/video/${this.props.videoId}`)
            .then(res => {
                let videoInfo = res.data;
                axios.post('/api/view/' + this.props.videoId);
                axios.post('/api/incrementInteraction/' + videoInfo.snippet.channelTitle);

                axios.get('/api/checkLike/' + this.props.videoId).then((res) => {
                    console.log('checklike', res);
                    this.setState({
                        videoInfo: videoInfo,
                        isLoading: false,
                        likeStatus: res.data.result
                    });
                });


                let _recommendedList = [];
                axios.get('/api/recommendedPlaylist/' + this.props.videoId)
                    .then((res) => {
                        if (res.data) _recommendedList = _recommendedList.concat(res.data);
                        return axios.get('/api/recommendedVideo/' + this.props.videoId);
                    })
                    .then((res) => {
                        if (res.data) _recommendedList = _recommendedList.concat(res.data);
                        console.log('recommended xy', _recommendedList);
                        this.setState({
                            recommendedList: _recommendedList
                        });
                    });

            }).catch((err) => this.props.history.push('/404'));
        document.body.scrollTop = 0;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== prevProps) {
            axios.get(`/api/video/${this.props.videoId}`)
                .then(res => {
                    let videoInfo = res.data;
                    axios.post('/api/view/' + this.props.videoId);
                    axios.post('/api/incrementInteraction/' + videoInfo.snippet.channelTitle);
                    axios.get('/api/checkLike/' + this.props.videoId).then((res) => {
                        console.log('checklike', res);
                        this.setState({
                            videoInfo: videoInfo,
                            isLoading: false,
                            likeStatus: res.data.result
                        });
                    });

                    let _recommendedList = [];
                    axios.get('/api/recommendedVideo/' + this.props.videoId)
                        .then((res) => {
                            if (res.data) _recommendedList = _recommendedList.concat(res.data);
                            return axios.get('/api/recommendedPlaylist/' + this.props.videoId);
                        })
                        .then((res) => {
                            if (res.data)  _recommendedList = _recommendedList.concat(res.data);
                            console.log('recommended xx: ', _recommendedList);
                            this.setState({
                                recommendedList: _recommendedList
                            });
                        });

                }).catch((err) => this.props.history.push('/404'));
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
            axios.post('/api/unlike/' + this.state.videoId);
            axios.post('/api/decrementInteraction/' + this.state.videoInfo.snippet.channelTitle);
            this.setState({
                videoInfo: Object.assign({}, this.state.videoInfo, {
                    statistics: Object.assign({}, this.state.videoInfo.statistics, {
                        likeCount: Number(this.state.videoInfo.statistics.likeCount) - 1
                    })
                }),
                likeStatus: 0
            });
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/like/' + this.state.videoId);
            axios.post('/api/incrementInteraction/' + this.state.videoInfo.snippet.channelTitle);
            this.setState({
                videoInfo: Object.assign({}, this.state.videoInfo, {
                    statistics: Object.assign({}, this.state.videoInfo.statistics, {
                        likeCount: Number(this.state.videoInfo.statistics.likeCount) + 1
                    })
                }),
                likeStatus: 1
            });
        } else {
            axios.post('/api/incrementInteraction/' + this.state.videoInfo.snippet.channelTitle);
            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                axios.post('/api/like/' + this.state.videoId);
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            likeCount: Number(this.state.videoInfo.statistics.likeCount) + 1,
                            dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) - 1
                        })
                    }),
                    likeStatus: 1
                });
            });
        }
    }

    handleDislike() {
        if (this.state.likeStatus === 1) {
            axios.post('/api/unlike/' + this.state.videoId).then((res) => {
                axios.post('/api/dislike/' + this.state.videoId);
                this.setState({
                    videoInfo: Object.assign({}, this.state.videoInfo, {
                        statistics: Object.assign({}, this.state.videoInfo.statistics, {
                            likeCount: Number(this.state.videoInfo.statistics.likeCount) - 1,
                            dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) + 1
                        })
                    }),
                    likeStatus: -1
                });
            });
        } else if (this.state.likeStatus === 0) {
            axios.post('/api/dislike/' + this.state.videoId);
            this.setState({
                videoInfo: Object.assign({}, this.state.videoInfo, {
                    statistics: Object.assign({}, this.state.videoInfo.statistics, {
                        dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) + 1
                    })
                }),
                likeStatus: -1
            });
        } else {

            axios.post('/api/unlike/' + this.state.videoId);
            this.setState({
                videoInfo: Object.assign({}, this.state.videoInfo, {
                    statistics: Object.assign({}, this.state.videoInfo.statistics, {
                        dislikeCount: Number(this.state.videoInfo.statistics.dislikeCount) - 1
                    })
                }),
                likeStatus: 0
            });
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
            console.log('recommended video', this.state.recommendedList);
            return (
                <section className='videopage_main_container'>
                    {notifyPrompt}
                    {unsubNotifyPrompt}
                    <section className='main_content_wrapper'>

                        <div className='iframe_placeholder'>
                            <video
                                className='iframe'
                                allowFullScreen
                                src={'/watch/' + this.props.videoId}
                                autoPlay
                                controls>
                            </video>
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

                    <section className='rightside_videos_wrapper'>
                        <RecommendedVideosContainer
                            recommendedList={this.state.recommendedList || [{}]} />
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

export default connect(mapStateToProps, {})(VideoPage);