import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import VideoContainer from './VideoItemContainer';

import './ChannelContainer.css'

class ChannelContainer extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            videosArr: [],
            canSubscribe: true,
            isLoading: true,
            subscriberCount: 0
        }

        this.displayDate = this.displayDate.bind(this);
        this.getViews = this.getViews.bind(this);
        this.getSubscribers = this.getSubscribers.bind(this);
        this.testFn = this.testFn.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
    }

    componentWillMount(){
        axios.get(`/api/videos/` + this.props.channelName).then((res) => {
            this.setState({
                videosArr: res.data
            });
            axios.get('/api/channelInfo/' + this.props.channelName)
                .then((res) => this.setState({ subscriberCount: res.data.subscriberCount }));
            axios.get(`/api/checkForSubscriptions/` + this.props.channelName).then((res)=>{
                let result = res.data.result;
                if (!result){
                    this.setState({
                        canSubscribe: true
                    })
                }else {
                    this.setState({
                        canSubscribe: false
                    })
                }
                this.setState({ isLoading: false });
                // if(!this.state.canSubscribe){
                //     let landingSubscribe = document.getElementById('landing_unsubscribe_bttn');
                //     let landingUnsubscribe = document.getElementById('landing_unsubscribe_bttn_hover');

                //     landingSubscribe.addEventListener("mouseenter", function(){
                //         landingSubscribe.style.display = 'none';
                //         landingUnsubscribe.style.display = 'block';
                //     })
                //     landingUnsubscribe.addEventListener("mouseleave", function(){
                //         landingSubscribe.style.display = 'block';
                //         landingUnsubscribe.style.display = 'none';
                //     })
                    
                // }
            })
            // console.log(this.state)
        })
        
    }

    // componentDidUpdate(){
    //     if(!this.state.canSubscribe){
    //         let landingSubscribe = document.getElementById('landing_unsubscribe_bttn');
    //         let landingUnsubscribe = document.getElementById('landing_unsubscribe_bttn_hover');

    //         landingSubscribe.addEventListener("mouseenter", function(){
    //             landingSubscribe.style.display = 'none';
    //             landingUnsubscribe.style.display = 'block';
    //         })
    //         landingUnsubscribe.addEventListener("mouseleave", function(){
    //             landingSubscribe.style.display = 'block';
    //             landingUnsubscribe.style.display = 'none';
    //         })
            
    //     }
    // }
    
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

    handleSubscribe(str){
        this.setState({
            canSubscribe: false
        });
        axios.post('/api/subscribe/' + this.props.channelName);
        this.setState((prev) => ({subscriberCount: prev.subscriberCount +1}));
    }

    handleUnsubscribe(str){
        this.setState({
            canSubscribe: true
        })
        axios.post('/api/unsubscribe/' + this.props.channelName);
        this.setState((prev) => ({ subscriberCount: prev.subscriberCount - 1 }));
    }

    getViews(){
       return Math.floor(Math.random() * 899 + 1) + ',' + Math.floor(Math.random() * 899 + 100) + ' views';
    }

    getSubscribers(){

    }

    testFn(){
        console.log('test');
    }
    render() {
        if (this.state.isLoading) return null;
        let landingSubbtn;
        let landingSubbtnTwo;
        if(this.state.canSubscribe){
            landingSubbtn = <div id="subscribe_bttn" onClick= { this.handleSubscribe}>
                    <div id="bttn_img">
                </div>Subscribe</div>
        } else {
            landingSubbtnTwo = <section>
                    {/*<div id="landing_unsubscribe_bttn" onClick= { ()=> this.handleUnsubscribe(videos[0].snippet.channelTitle) }>
                        <div id="unsub_bttn_img">
                    </div>Subscribed</div>*/}
                    
                <div id="landing_unsubscribe_bttn_hover" onClick={this.handleUnsubscribe }>
                        <div id="unsub_bttn_img_hover">
                    </div>Unsubscribe</div>
                </section>
        }




        console.log('video ', this.state.videosArr);

        let videos = this.state.videosArr;
        return (
            <div id="main_videos_container">
                <div id="video_channel_name">{this.props.channelTitle}</div>
                { landingSubbtn }
                { landingSubbtnTwo }
                <div id="subscribers_count">{this.state.subscriberCount}</div>
                {videos.map((video) => <VideoContainer id={video.id} key={video.id}/>)}
            </div>
        )
    }
    
}

export default ChannelContainer;