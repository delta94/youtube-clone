import './Comment.css';
import bullet from './../../Header/img/bullet.png';
import React, { Component } from 'react';
import Avatar from 'react-avatar';
import axios from 'axios';
import Reply from '../Reply/Reply';

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reportClicked: false,
            likeStatus: 0,
            likeCount: parseInt(props.likeCount),
            commentId: props.comment_id,
            videoId: props.video_id,
            showReplyInput: false,
            showReplies: false,
            replies: [],
            isLoading: true,
            replyCount: props.replyCount,
            replyContent: ''
        };

        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleReportClick = this.handleReportClick.bind(this);
        this.handleDeleteOnClick = this.handleDeleteOnClick.bind(this);
        this.handleShowOnClick = this.handleShowOnClick.bind(this);
        this.renderReplies = this.renderReplies.bind(this);
        this.handleReplyOnChange = this.handleReplyOnChange.bind(this);
        this.handleReplyOnSubmit = this.handleReplyOnSubmit.bind(this);
        this.handleDeleteReplyOnClick = this.handleDeleteReplyOnClick.bind(this);
        this.handleReplyOnClick = this.handleReplyOnClick.bind(this);
    }

    handleReplyOnClick() {
        this.setState({ showReplyInput: true });
    }

    handleLike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeComment', {
                cmtId: this.state.commentId
            });
            this.setState((prev) => ({
                likeCount: prev.likeCount - 1,
                likeStatus: 0
            }));
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/likeComment', {
                cmtId: this.state.commentId
            });
            this.setState((prev) => ({
                likeCount: prev.likeCount + 1,
                likeStatus: 1
            }));
        } else {
            axios.post('/api/unlikeComment', {
                cmtId: this.state.commentId
            }).then((res) => {
                axios.post('/api/likeComment', {
                    cmtId: this.state.commentId
                });
                });
            this.setState((prev) => ({
                likeCount: prev.likeCount + 1,
                likeStatus: 1
            }));
        }
    }

    handleDislike() {
        if (this.state.likeStatus == 1) {
            axios.post('/api/unlikeComment', {
                cmtId: this.state.commentId
            }).then((res) => {
                axios.post('/api/dislikeComment', {
                    cmtId: this.state.commentId
                });
            });
            this.setState((prev) => ({
                likeCount: prev.likeCount - 1,
                likeStatus: -1
            }));
        } else if (this.state.likeStatus == 0) {
            axios.post('/api/dislikeComment', {
                cmtId: this.state.commentId
            });
            this.setState({
                likeStatus: -1
            });
        } else {
            axios.post('/api/unlikeComment', {
                cmtId: this.state.commentId
            });
            this.setState({
                likeStatus: 0
            });
        }
    }

    componentDidMount() {
        console.log('will mount', this.props.comment_id);
        axios.get('/api/checkCommentLike/' + this.props.comment_id)
            .then((res) => {
                console.log('result cmt like', res.data.result);
                this.setState({ likeStatus: res.data.result })
            });
        
    }

    handleReportClick() {
        this.setState((prevState) => ({reportClicked: !prevState.reportClicked}));
    }

    handleDeleteOnClick() {
        this.props.handleDeleteComment(this.props.video_id, this.props.comment_id);
    }

    handleReplyOnChange() {
        this.setState({ showReplyInput: true });
    }

    handleReplyOnSubmit(e) {
        e.preventDefault();
        console.log('submited');
        this.state.isLoading = true;
        axios.post('/api/reply', {
            username: this.props.currentUser,
            cmtId: this.props.comment_id,
            content: this.state.replyContent
        }).then((res) => {
            axios.get('/api/replies/' + this.state.commentId).then((res) => {
                console.log('fetch new reply');
                this.setState({ replies: res.data, showReplies: true, showReplyInput: false, isLoading: false });
            });   
        })
    }

    renderLike() {
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
                    </div>    
                );    
        }

    }

    handleShowOnClick() {
        axios.get('/api/replies/' + this.state.commentId).then((res) => {
            console.log('fetch');
            this.setState((prev) => ({ replies: res.data, showReplies: !prev.showReplies, isLoading: false }));
        });
    }

    renderReplies() {
        if (!this.state.showReplies) return null;
        if (this.state.isLoading) return null;
        return this.state.replies.map((reply) =>
            <Reply key={reply.reply_id}
                content={reply.content}
                id={reply.reply_id}
                dtime={reply.dtime}
                name={reply.name}
                likeCount={reply.likeCount}
                commentId={this.props.comment_id}
                handleDeleteReplyOnClick={this.handleDeleteReplyOnClick}
                currentUser={this.props.currentUser}
                />)
    }

    handleDeleteReplyOnClick(rep_id) {
        console.log('comment delete');
        this.state.isLoading = true;
        axios.delete('/api/reply/' + rep_id)
            .then((res) => {
                axios.get('/api/replies/' + this.state.commentId).then((res) => {
                    console.log('fetch new reply');
                    this.setState({ replies: res.data, showReplies: true, showReplyInput: false, isLoading: false, replyCount: res.data.length > 0 });
                }); 
        })
    }

    handleReplyOnChange(e) {
        this.setState({ replyContent: e.target.value });
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
        let showButton = !this.state.showReplies ?
            <b id="show-btn" onClick={this.handleShowOnClick}>Show replies »</b> :
            <b id="show-btn" onClick={this.handleShowOnClick}>Hide replies »</b>
        let form = <div className="reply-form">
                <Avatar className="pull-left"  name={this.props.currentUser} size={25} round={true} textSizeRatio={2} />
                <form className="pull-left"
                    onSubmit={this.handleReplyOnSubmit}>
                <input type="text" onChange={this.handleReplyOnChange} autoFocus />
                <input type="submit" style={{ display: "none" }}/>
                    <button className="cancel-btn" onClick={() => this.setState({showReplyInput: false})}>x</button>
                </form>
        </div>

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
                {this.state.showReplyInput && form}
                {this.state.replyCount > 0 && showButton}
                {this.renderReplies()}
            {reportBttn}
        </div>
        );
    }
}

export default Comment;
