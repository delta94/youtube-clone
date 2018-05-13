import './Reply.css';
import like from './images/like.png';
import likeActive from './images/like_active.png';
import dislike from './images/dislike.png';
import dislikeActive from './images/dislike_active.png';
import bullet from './../../Header/img/bullet.png';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import Clock from '../../Clock/Clock';

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            likeCount: parseInt(props.likeCount),
            likeStatus: 0
        }

        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.handleDeleteButtonOnClick = this.handleDeleteButtonOnClick.bind(this);
    }

    componentDidMount() {
        console.log('props: ', this.props);
        axios.get('/api/checkReplyLike/' + this.props.id)
            .then((res) => {
                this.setState({ likeStatus: res.data.result });
            });
    }

    handleLike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeReply/' + this.props.id);
            this.setState((prev) => ({
                likeCount: prev.likeCount - 1,
                likeStatus: 0
            }));
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/likeReply/' + this.props.id);
            this.setState((prev) => ({
                likeCount: prev.likeCount + 1,
                likeStatus: 1
            }));
        } else {
            axios.post('/api/unlikeReply/' + this.props.id).then((res) => {
                axios.post('/api/likeReply/' + this.props.id);
            });
            this.setState((prev) => ({
                likeCount: prev.likeCount + 1,
                likeStatus: 1
            }));
        }
    }

    handleDislike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeReply/' + this.props.id).then((res) => {
                axios.post('/api/dislikeReply/' + this.props.id);
            });
            this.setState((prev) => ({
                likeCount: prev.likeCount - 1,
                likeStatus: -1
            }));
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/dislikeReply/' + this.props.id);
            this.setState({
                likeStatus: -1
            });
        } else {
            axios.post('/api/unlikeReply/' + this.props.id);
            this.setState({
                likeStatus: 0
            });
        }
    }

    renderLike() {
        switch (this.state.likeStatus) {
            case 0:
                return (
                    <div>
                        <ul id="reply_functions_bar">
                            <li onClick={this.handleReplyOnClick}>Reply</li>
                            <li>•</li>
                            <li><span style={{ color: "blue" }}>{this.state.likeCount}</span></li>
                            <li><img src={like} width={15} height={15} onClick={this.handleLike}/></li>
                            <li><img src={dislike} width={15} height={15} onClick={this.handleDislike}/></li>
                        </ul>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <ul id="reply_functions_bar">
                            <li onClick={this.handleReplyOnClick}>Reply</li>
                            <li>•</li>
                            <li><span style={{ color: "blue" }}>{this.state.likeCount}</span></li>
                            <li><img src={likeActive} width={15} height={15} onClick={this.handleLike}/></li>
                            <li><img src={dislike} width={15} height={15} onClick={this.handleDislike}/></li>
                        </ul>
                    </div>
                );
            default:
                return (
                    <div>
                        <ul id="reply_functions_bar">
                            <li onClick={this.handleReplyOnClick}>Reply</li>
                            <li>•</li>
                            <li><span style={{ color: "blue" }}>{this.state.likeCount}</span></li>
                            <li><img src={like} width={15} height={15} onClick={this.handleLike}/></li>
                            <li><img src={dislikeActive} width={15} height={15} onClick={this.handleDislike}/></li>
                        </ul>
                    </div>
                );
        }

    }

    handleDeleteButtonOnClick() {
        console.log('reply delet');
        this.props.handleDeleteReplyOnClick(this.props.id);
    }

    renderDelete() {
        if (this.props.currentUser == this.props.name) return <span id="delete-btn" onClick={this.handleDeleteButtonOnClick}>x</span>
        else return null;
    }

    render() {
        return (
            <div className="reply-item">
            <div>    
                <Avatar className="pull-left" name={this.props.name} size={25} round={true} textSizeRatio={2} />
                    <p><b id="username">{this.props.name}</b>&ensp;&ensp;<span id="dtime"><Clock date={this.props.dtime} /></span>&ensp;&ensp;&ensp;{this.renderDelete()}</p>
                    
                <p id="content">{this.props.content}</p>
                    {this.renderLike()}
                </div>    
            </div>
        );
    }
}

export default Reply;
