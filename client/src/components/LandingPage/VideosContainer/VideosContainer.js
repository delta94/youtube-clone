import React from 'react'
import { connect } from 'react-redux'
import { Component } from 'react';
import ChannelContainer from './ChannelContainer/ChannelContainer'
import axios from 'axios';
import './VideosContainer.css'


export default class VideosContainer extends Component{
    constructor(props) {
        super(props);

        this.state = {
            interactiveChannels: [],
            isLoading: true
        }
    }

    componentWillMount() {
        axios.get('/api/interactiveChannels?bound=1').then((res) => this.setState({interactiveChannels: res.data, isLoading: false}))
    }

    render() {
        if (this.state.isLoading) return null;
        else {
            return (
                <section className="main_video_container">
                    <div id="main_container">
                        {this.state.interactiveChannels.map((channel) => 
                            <ChannelContainer
                                channelName={channel.username}
                                channelTitle={channel.name}
                                key={channel.name}
                            />)
                        }    
                        <section id="load_more_container">
                            <div id="load_more">Load more</div>
                        </section>
                    </div>

                </section>
            )
        }
  
    }
    
}
