import React from 'react'
import {Component} from 'react';
import bullet from './../Header/img/bullet.png'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import image from './images/91.png';

import watch_later from './../Header/img/watch_later.png';
import dropdown from '../Header/img/drop_down_arrow.png';
import './SearchResults.css';
import Avatar from 'react-avatar';

class SearchResults extends Component{

    constructor(props){
        super(props);
        this.state = {
            videoArr: [
                {
                    snippet:{
                        thumbnails: {
                            medium: {},
                        },
                    },
                    id: {
                        videoId: ''
                    }
                },
            ],
            playlistArr: [],
            accountArr: [],
            filterClicked: false,
            pagination: {},
            views: [
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
                Math.floor(Math.random() * 1500000 + 1).toLocaleString() + ' views',
            ],
            numberOfResults: Math.floor(Math.random() * 5000000 + 1).toLocaleString()
        }

        this.getViews = this.getViews.bind(this)
        this.getResults = this.getResults.bind(this)
        this.filterClickedFn = this.filterClickedFn.bind(this)
        this.getPrevPage = this.getPrevPage.bind(this)
        this.getNextPage = this.getNextPage.bind(this)
    }

    componentDidMount(){
        axios.get(`/api/search/${this.props.userInput}`).then(result => {
            this.setState({
                videoArr: result.data.videos,
                playlistArr: result.data.playlists,
                accountArr: result.data.accounts,
                // pagination: videoArr.data
            });
        })
        document.body.scrollTop = 0;
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props !== prevProps){
            axios.get(`/api/search/${this.props.userInput}`).then(result => {
            console.log(result);
            this.setState({
                    videoArr: result.data.videos,
                    playlistArr: result.data.playlists,
                    accountArr: result.data.accounts,
                    // pagination: videoArr.data
                })
            })
        }
        document.body.scrollTop = 0;
    }

    displayDate(dateStr){
        let dateObj = new Date(dateStr);
        let postedYear = dateObj.getFullYear();
        let postedMonth = dateObj.getMonth();
        let today= new Date();
        let todayMonth = today.getMonth();
        let thisYear = today.getFullYear();
        let howLongYear = thisYear - postedYear;
        let howLong = todayMonth - postedMonth;
        if(thisYear - postedYear === 0){
            if(Math.abs(howLong) > 1){
                return Math.abs(howLong) + ' months ago';
            } else{
                return Math.abs(howLong) + ' month ago';
            }
        }
        if(thisYear - postedYear > 0){
            if(Math.abs(howLongYear > 1)){
                return Math.abs(howLongYear) + ' years ago';
            } else {
                return Math.abs(howLongYear) + ' year ago';
            }
        }
    }

    getViews(index){
       return this.state.views[index];
    }

    getResults(){
        return 'About ' + this.state.numberOfResults + ' results'
    }
    filterClickedFn(){
        this.setState({
            filterClicked: !this.state.filterClicked
        })
    }

    getPrevPage(){
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=${ this.state.pagination.prevPageToken }&q=${this.props.userInput }&type=video&key=AIzaSyA6QnEmVEZ_b2ZQO8GLc7CTEU3g-xDyhFY`).then( videoArr => {
            this.setState({
                videoArr: videoArr.data.items,
                pagination: videoArr.data
            })
            console.log(this.state.pagination)
        })
    }

    getNextPage(){
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=viewCount&pageToken=${ this.state.pagination.nextPageToken }&q=${this.props.userInput }&type=video&key=AIzaSyA6QnEmVEZ_b2ZQO8GLc7CTEU3g-xDyhFY`).then( videoArr => {
            this.setState({
                videoArr: videoArr.data.items,
                pagination: videoArr.data
            })
            console.log(this.state.pagination)
        })
    }
    render(){
        let filterBttn = null;
        if(this.state.filterClicked){
            filterBttn = <section id="menu_dropdown">
                <ul className="first_column">
                    <li>Upload date</li>
                    <li>Today</li>
                    <li>This week</li>
                    <li>This month</li>
                    <li>This year</li>
                </ul>
                <ul className="second_column">
                    <li>Type</li>
                    <li>Video</li>
                    <li>Channel</li>
                    <li>Playlist</li>
                    <li>Movie</li>
                    <li>Show</li>
                </ul>
                <ul className="third_column">
                    <li>Duration</li>
                    <li>Short</li>
                    <li>Long (> 20 minutes)</li>
                </ul>
                <ul className="fourth_column">
                    <li>Features</li>
                    <li>4K</li>
                    <li>HD</li>
                    <li>Subtitles/CC</li>
                    <li>Creative Commons</li>
                    <li>3D</li>
                    <li>Live</li>
                    <li>Purchased</li>
                    <li>360&deg;</li>
                </ul>
                <ul className="fifth_column">
                    <li>Sort by</li>
                    <li>Relevance</li>
                    <li>Upload date</li>
                    <li>Rating</li>
                </ul>
            </section>
        } else {
            filterBttn = null;
        }
        let videos = this.state.videoArr;
        let playlists = this.state.playlistArr;
        let accounts = this.state.accountArr;
        let orderedResults = [];
        let id = 0;
        videos.map( (video) => {
            orderedResults.push({
                code: <div key={id++} className="result_container">
                <a className="image_container" href={`/video/${id}`}>
                    <img className="result_image_rect" src={`/images/thumbnails/${id}.png`}/>
                </a>
                <div className="result_text">
                    <a className="result_title" href={`/video/${id}`}>{video.name}</a>
                    <div>
                        <span className="result_subtitle end_bullet">{video.upload_account}</span>
                        <span className="result_subtitle end_bullet">{video.views} Views</span>
                        <span className="result_subtitle">{video.published_dtime}</span>
                    </div>
                    <div className="result_description">{video.description}</div>
                </div>
            </div>
            , relevance: video.relevance});
        }
        );
        playlists.map((playlist) => {
            let samples = JSON.parse(playlist.samples);
            orderedResults.push({ code: <div key={id++} className="result_container">
                <a className="image_container" href={`/playlist/${id}`}>
                    <img className="result_image_rect" src={`/images/thumbnails/${samples[0].id}.png`}></img>
                    <div className="playlist_overlay">
                        <div className="playlist_videos_count">
                            {playlist.videos_count}
                        </div>
                        <div className="playlist_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z"/>
                                <path d="M4 10h12v2H4zm0-4h12v2H4zm0 8h8v2H4zm10 0v6l5-3z"/>
                            </svg>
                        </div>
                    </div>
                </a>
                <div className="result_text">
                    <a className="result_title" href={`/playlist/${id}`}>{playlist.name}</a>
                    <div className="video_entries_container">{samples.slice(0,2).map(sample => {
                        return <a className="video_entry" href={`/video/${sample.id}`}>{sample.name} - {sample.length}</a>
                    })}</div>
                </div>
            </div>, relevance: playlist.relevance});
        });
        accounts.map((account) => {
            orderedResults.push({code: <div key={id++} className="result_container">
                        <a className="image_container" href={`/channel/${account.username}/home`}>
                            <Avatar className="result_image_circle" name={account.name} round={true}/>
                        </a>
                    <div className="result_text">
                        <a className="result_title" href={`/channel/${account.username}/home`}>{account.name}</a>
                        <div>
                            <span className="result_subtitle" id="subcribers_count">{account.subscribes} subcribers</span>
                            <span className="result_subtitle" id="videos_count">{account.videos} videos</span>                                    
                        </div>
                        <div className="result_description">{account.description}</div>
                    </div>
                </div>, relevance: account.relevance});
            });
        console.log(orderedResults);
        orderedResults = orderedResults.sort((a, b) => {
            if (a.relevance < b.relevance) {
                return 1;
            } else if (a.relevance == b.relevance) {
                return 0;
            } else {
                return -1;
            }
        });
        return (
            <section className='main_search_container'>

                <section id="first_box">
                    <div id="filter_bttn" onClick={ this.filterClickedFn }>
                        <h1>Filters</h1>
                        <img src={ dropdown } />
                    </div>
                    <h2>{ this.getResults() }</h2>
                </section>

                { filterBttn }

                <section className='main_video_search_container'>
                    {orderedResults.slice(0, 10).map(result => {
                        return result.code;
                    })}
                </section>
            </section>
        )
    }
}

function mapStateToProps(state, ownProps){
    return {
        userInput: ownProps.match.params.userInput
    }
}

export default connect(mapStateToProps, {})(SearchResults);