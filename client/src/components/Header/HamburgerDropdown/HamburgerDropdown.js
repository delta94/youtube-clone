import play from './images/playlist.png';
import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import './HamburgerDropdown.css';
import SvgIcon from 'react-icons-kit';
import axios from 'axios';
import { connect } from 'react-redux';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
import Avatar from 'react-avatar';
  
class MySideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subscriptionCount: 0,
            subscribedChannels: [],
            savedPlaylists: []
        }
    }

    componentDidMount() {
         
        axios.get('/api/subscriptionCount').then((res) => this.setState({ subscriptionCount: res.data }));
        axios.get('/api/subscribedChannels').then((res) => this.setState({ subscribedChannels: res.data }));
        axios.get('/api/playlists?type=saved').then((res) => this.setState({ savedPlaylists: res.data }));
    }



    render() {
         
        let getUsername = () =>  this.props.user ? this.props.user.username : '';
        return (
            <div className="sidebar" style={this.props.style}>
                <div className="nav-outer-container">
                    <div className="nav-content-container">


                        <ul className="nav-main-sections-container">

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <li className="nav-main-section-link">
                                            <NavLink exact={true} strict={true} to='/' className="nav-main-section-link-a" activeClassName="hamburger-item-active">
                                                <span className="link-container">
                                                    <span className="nav-link-icon"><i className="ion-home icon"></i></span>
                                                    <span className="nav-link-text">Home</span>
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <NavLink to='/trending' className="nav-main-section-link-a" exact>

                                            <span className="link-container">
                                                <span className="nav-link-icon"><i className="ion-flame icon"></i></span>
                                                <span className="nav-link-text">Trending</span>
                                            </span>
                                        </NavLink>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <NavLink to='/subscriptions' className="nav-main-section-link-a" exact>
                                            <span className="link-container">
                                                <span className="nav-link-icon"><i className="ion-ios-albums-outline icon"></i></span>
                                                <span className="nav-link-text">Subscriptions
                    <span className="nav-link-numbers">{this.state.subscriptionCount}</span>
                                                </span>
                                            </span>
                                        </NavLink>
                                    </ul>
                                </div>
                            </li>

                        </ul>

                        <hr />

                        <ul className="nav-main-sections-container">

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <h3 className="nav-main-section-header">
                                        <a className="nav-main-section-header-a" href="#">LIBRARY</a>
                                    </h3>
                                    <ul className="nav-main-section-links">
                                        <li className="nav-main-section-link">
                                            <NavLink to='/wl' className="nav-main-section-link-a" exact>
                                                <span className="link-container">
                                                    <span className="nav-link-icon"><i style={{ fontSize: 18 }} className="ion-ios-clock icon"></i></span>
                                                    <span className="nav-link-text">Watch later</span>
                                                </span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>


                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <NavLink to='/history' className="nav-main-section-link-a" exact>
                                            <span className="link-container">
                                                <span className="nav-link-icon"><i style={{fontSize: 22}} className="ion-ios-filing icon" /></span>
                                                <span className="nav-link-text">History</span>
                                            </span>
                                        </NavLink>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <NavLink to='/lv' className="nav-main-section-link-a" exact>
                                            <span className="link-container">
                                                <span className="nav-link-icon"><i className="ion-thumbsup icon"></i></span>
                                                <span className="nav-link-text">Liked videos</span>
                                            </span>
                                        </NavLink>
                                    </ul>
                                </div>
                            </li>



                        </ul>









                        <hr />

                        <ul className="nav-main-sections-container">
                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <h3 className="nav-main-section-header">
                                        <a className="nav-main-section-header-a" href="#">SUBSCRIPTIONS</a>
                                    </h3>
                                    <ul className="nav-main-section-links">
                                        {this.state.subscribedChannels.map((channel) =>  <li key={channel.channelTitle} className="nav-main-section-link">
                                            <Link to={`/channel/${channel.channelTitle}/home`} className="nav-main-section-link-a">
                                                <span className="link-container">
                                                    <span className="nav-link-img">
                                                        <Avatar size={25} round={true} textSizeRatio={2} name={channel.channelTitle} />
                                                    </span>
                                                    <span className="nav-link-text">{channel.channelTitle}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>)
                                        }    

                                        {this.state.savedPlaylists.map((playlist) => <li key={playlist.playlist_id} className="nav-main-section-link">
                                            <Link to={`/playlist/` + playlist.playlist_id} className="nav-main-section-link-a">
                                                <span className="link-container">
                                                    <span className="nav-link-img">
                                                        <img src={play} />
                                                    </span>
                                                    <span className="nav-link-text">{playlist.name}
                                                    </span>
                                                </span>
                                            </Link>
                                        </li>)}

                                    </ul>
                                </div>
                            </li>

                        </ul>


                        <hr />

                        <ul className="nav-main-sections-container">

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <li className="nav-main-section-link">
                                            <a href="#" className="nav-main-section-link-a">
                                                <span className="link-container">
                                                    <span className="nav-link-icon"><i className="ion-ios-plus icon"></i></span>
                                                    <span className="nav-link-text">Browse Channels</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <li className="nav-main-section">
                                <div className="nav-main-section-inner-container">
                                    <ul className="nav-main-section-links">
                                        <li className="nav-main-section-link">
                                            <a href="#" className="nav-main-section-link-a">
                                                <span className="link-container">
                                                    <span className="nav-link-icon"><i className="ion-ios-gear icon"></i></span>
                                                    <span className="nav-link-text">Manage Subscriptions</span>
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>
            </div>

        )
    }
}


export default MySideNav;
