import React, { Component } from 'react';
import axios from 'axios';
import './CommentsContainer.css';
import bullet from './../../Header/img/bullet.png';
import userImg from './../../Header/img/photo.jpg';
import down_arrow from './../../Header/img/drop_down_arrow.png';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import Comment from '../Comment/Comment';

class CommentsContainer extends Component {

    constructor(props){
        super(props);

       this.state = {
            comments: [
                {
                    username: '',
                    date: '',
                    text: ''
                },
            ],
            userInput: '',
            clicked: false,
            reportClicked: false,
            likeCount: 0,
            isLoading: true
        }

        this.formatDate = this.formatDate.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
        this.handleUserInputChange = this.handleUserInputChange.bind(this);
        this.postUserComment = this.postUserComment.bind(this);
        this.handleCommentFilterChange = this.handleCommentFilterChange.bind(this);
        this.handleReportClick = this.handleReportClick.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

   componentWillMount(){
        axios.get( '/api/comments/' + this.props.videoId )
        .then( res => {
            this.setState({
                comments: res.data, isLoading: false
            })
        })
    }

    componentDidUpdate(prevProps, prevState){
        if ( this.props !== prevProps ){
            axios.get( '/api/comments/' + this.props.videoId )
            .then( res => {
                this.setState({
                    comments: res.data
                })
            })
        }
    }

    handleUserInputChange(e){
        this.setState({
            userInput: e.target.value
        })
    }

    postUserComment(e){
        e.preventDefault();
        axios.post('/api/comments', {
            content: this.state.userInput,
            videoId: this.props.videoId
        })
        .then( () => {
            axios.get( '/api/comments/' + this.props.videoId )
                .then(res => {
                this.setState({
                    comments: res.data,
                    userInput: ''
                })
            })
        })
    }

   formatDate(str){
        let timeAgo = new Date(str);
        return timeAgo
    }

    handleCommentFilterChange(){
        this.setState({
            clicked: !this.state.clicked
        });
            if(!this.state.clicked){
            document.getElementById('comment_filter').style.background = '#e9e9e9'; 
            } else if (this.state.clicked) {
                document.getElementById('comment_filter').style.background = '#f8f8f8';
            } else {
                document.getElementById('comment_filter').style.background = '#f8f8f8';
            }
    }

    handleReportClick(){
        this.setState({
            reportClicked: !this.state.reportClicked
        });
    }

    handleLike(){
        this.setState({
            likeCount: this.state.likeCount + 1
        })
    }

    handleDislike(){
        let count = 0;
        count++
    }

    handleDeleteComment(videoId, commentId) {
        axios.delete(`/api/comment?videoId=${videoId}&commentId=${commentId}`).then(() => {
            axios.get('/api/comments/' + this.props.videoId)
                .then(res => {
                    this.setState({
                        comments: res.data,
                        userInput: ''
                    })
                })
        })
    }
    
    render() {
        let filterBttn = null;
        if(this.state.clicked){
            filterBttn = <div id="filter_content">
                <p>Top Comments</p>
                <p>Newest First</p>
            </div>
        }
        if (this.state.isLoading) {
            return null;
        } else
        return (
            <div className='comments_wrapper'>
                <div className='comments_container'>
                    <ul>
                        <li>COMMENTS</li>
                        <li><img src={ bullet }/></li> 
                        <li>0</li>
                    </ul>
                    <div id="user_img">
                        <img src={ userImg }/>
                    </div>
                    <div id="comment_input_tick">
                        <div id="comment_input_tick_inner">
                        </div>
                    </div>
                    <div id="comment_input">
                        <form onSubmit={ this.postUserComment }>
                            <input 
                            placeholder="Add a public comment..."
                            onChange={ this.handleUserInputChange }
                            value={ this.state.userInput }
                            />
                        </form>
                    </div>
                    <div id="border_line">
                    </div>
                </div>
                <section className='all_comments'>
                    <div id="comment_filter" onClick={ this.handleCommentFilterChange }>
                        <p>Top Comments</p>
                        <div><img src={ down_arrow }/></div>
                    </div>
                    { filterBttn }
                {
                    this.state.comments.map((comment) =>
                            <Comment
                                key={comment.comment_id}
                                name={comment.name}
                                dtime={comment.dtime}
                                content={comment.content}
                                currentUser={this.props.auth.username}
                                handleDeleteComment={this.handleDeleteComment}
                                video_id={comment.video_id}
                                comment_id={comment.comment_id}
                                likeCount={comment.likeCount}
                                replyCount={comment.replyCount}
                            />
                    )
                    }
                    </section>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(CommentsContainer);
