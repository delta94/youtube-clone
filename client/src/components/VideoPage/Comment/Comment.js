import './Comment.css';
import bullet from './../../Header/img/bullet.png';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportClicked: false,
            likeStatus: 0,
            likeCount: parseInt(props.likeCount),
            commentId: props.comment_id,
            videoId: props.video_id,
            replyClicked: false,
            replyContent: ''
        };

        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleReportClick = this.handleReportClick.bind(this);
        this.handleDeleteOnClick = this.handleDeleteOnClick.bind(this);
        this.handleReplyOnClick = this.handleReplyOnClick.bind(this);
    }

    handleLike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeComment/' + this.state.commentId);
            this.setState((prev) => ({
                likeCount: prev.likeCount - 1,
                likeStatus: 0
            }));
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/likeComment/' + this.state.commentId).then((res) => {
                this.setState((prev) => ({
                    likeCount: prev.likeCount + 1,
                    likeStatus: 1
                }));
            })
        } else {
            axios.post('/api/unlikeComment/' + this.state.commentId).then((res) => {
                axios.post('/api/likeComment/' + this.state.commentId).then((res) => {
                    this.setState((prev) => ({
                        likeCount: prev.likeCount + 1,
                        likeStatus: 1
                    }));
                })
            });
        }
    }

    handleDislike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeComment/' + this.state.commentId).then((res) => {
                axios.post('/api/dislikeComment/' + this.state.commentId).then((res) => {
                    this.setState((prev) => ({
                        likeCount: prev.likeCount-1,
                        likeStatus: -1
                    }));
                })
            });
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/dislikeComment/' + this.state.commentId).then((res) => {
                this.setState({
                    likeStatus: -1
                });
            })
        } else {
            axios.post('/api/unlikeComment/' + this.state.commentId).then((res) => {
                this.setState({
                    likeStatus: 0
                });
            })
        }
    }

    componentDidMount() {
        console.log('will mount', this.props.comment_id);
        axios.get('/api/checkCommentLike/' + this.props.comment_id)
            .then((res) => {
                console.log('result', res.data.result);
                this.setState({ likeStatus: res.data.result })
            });
    }

    handleReportClick() {
        this.setState((prevState) => ({reportClicked: !prevState.reportClicked}));
    }

    handleDeleteOnClick() {
        this.props.handleDeleteComment(this.props.video_id, this.props.comment_id);
    }

    handleReplyOnClick() {
        this.setState({ replyClicked: true });
    }

    handleReplyOnSubmit() {
        axios.post('/api/reply', {
            cmtId: this.state.commentId,
            content: this.state.replyContent
        })
    }

    renderLike() {
        let form =
            <form className="reply-form"
                onSubmit={this.handleReplyOnSubmit}>
                <input type="text" onChange={this.handleReplyOnChange}/>
            </form>
        switch (this.state.likeStatus) {
            case 0:
                return (
                    <div>
                    <ul id="reply_functions">
                        <li onClick={this.handleReplyOnClick}>Reply</li>
                        <li><img src={bullet} id="bullet" /></li>
                        <li>{this.state.likeCount}</li>
                        <li><div onClick={this.handleLike} id="thumb_up"></div></li>
                        <li><div onClick={this.handleDislike} id="thumb_down"></div></li>
                    </ul>
                        {form}
                    </div>    
                );    
            case 1:
                return (
                    <div>
                    <ul id="reply_functions">
                        <li onClick={this.handleReplyOnClick}>Reply</li>
                        <li><img src={bullet} /></li>
                        <li>{this.state.likeCount}</li>
                        <li><div onClick={this.handleLike} id="thumb_up_active"></div></li>
                        <li><div onClick={this.handleDislike} id="thumb_down"></div></li>
                        </ul>
                        {this.state.replyClicked && form}
                    </div>    
                );     
            default:
                return (
                    <div>
                    <ul id="reply_functions">
                        <li onClick={this.handleReplyOnClick}>Reply</li>
                        <li><img src={bullet} /></li>
                        <li>{this.state.likeCount}</li>
                        <li><div onClick={this.handleLike} id="thumb_up"></div></li>
                        <li><div onClick={this.handleDislike} id="thumb_down_active"></div></li>
                    </ul>
                        {this.state.replyClicked && form}
                    </div>    
                );    
        }

    }

    render() {
        let reportBttn = null;
        if (this.state.reportClicked) {
            if (this.props.name == this.props.currentUser) {
                reportBttn = <div id="delete_content" onClick={this.handleDeleteOnClick} >
                    <p>Delete</p>    
                </div>
            } else {
                reportBttn = <div id="report_content">
                    <p>Report spam or abuse</p>    
                </div>
            }
        }
        return (
            <div className='individual_comment'>      
            <div className="user_comment_thumbnail"><Avatar name={this.props.name} size={35} round={true} textSizeRatio={2} /></div>
            <ul id="user_info_comment">
                <li id="comment_user_name">{this.props.name}</li>
                <li id="comment_posted">{this.props.dtime}</li>
            </ul>
            <p id="comment_comment">{this.props.content}</p>

            <div className='comment_reply_box'>
                   {this.renderLike()}
            </div>
            <div id="report_bttn" >
                <div id="report_bttn_img" onClick={this.handleReportClick}></div>
            </div>
            {reportBttn}
        </div>
        );
    }
}

export default Comment;
