import React from 'react';
import { Route,Link } from 'react-router-dom';
import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import './HamburgerDropdown.css';
import SvgIcon from 'react-icons-kit';

import { ic_aspect_ratio } from 'react-icons-kit/md/ic_aspect_ratio';
import { ic_business } from 'react-icons-kit/md/ic_business';
  
function MySideNav (props) {
	return(
        <div className="sidebar" style={props.style}>
            <div className="nav-outer-container">
                <div className="nav-content-container">


                    <ul className="nav-main-sections-container">

                        <li className="nav-main-section">
                            <div className="nav-main-section-inner-container">
                                <ul className="nav-main-section-links">
                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-icon"><i className="ion-home icon"></i></span>
                                                <span className="nav-link-text">Home</span>
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
                                                <span className="nav-link-icon"><i className="ion-person icon"></i></span>
                                                <span className="nav-link-text">My Channel</span>
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
                                                <span className="nav-link-icon"><i className="ion-flame icon"></i></span>
                                                <span className="nav-link-text">Trending</span>
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
                                                <span className="nav-link-icon"><i className="ion-ios-albums-outline icon"></i></span>
                                                <span className="nav-link-text">Subscriptions
                    <span className="nav-link-numbers">12</span>
                                                </span>
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
                                                <span className="nav-link-icon"><i className="ion-ios-filing icon"></i></span>
                                                <span className="nav-link-text">History</span>
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
                                                <span className="nav-link-icon"><i className="ion-ios-time icon"></i></span>
                                                <span className="nav-link-text">Watch Later</span>
                                            </span>
                                        </a>
                                    </li>
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
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-icon"><i className="ion-ios-paper icon"></i></span>
                                                <span className="nav-link-text">Study mix</span>
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
                                                <span className="nav-link-icon"><i className="ion-ios-paper icon"></i></span>
                                                <span className="nav-link-text">Running tunes</span>
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
                                                <span className="nav-link-icon"><i className="ion-ios-paper icon"></i></span>
                                                <span className="nav-link-text">Evening/Chill</span>
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
                                                <span className="nav-link-icon"><i className="ion-thumbsup icon"></i></span>
                                                <span className="nav-link-text">Liked videos</span>
                                            </span>
                                        </a>
                                    </li>
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

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">8</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers"></span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers"></span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">5</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">17</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">12</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">3</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">25</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">7</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers"></span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

                                    <li className="nav-main-section-link">
                                        <a href="#" className="nav-main-section-link-a">
                                            <span className="link-container">
                                                <span className="nav-link-img">
                                                    <img src="https://hd.unsplash.com/photo-1445499348736-29b6cdfc03b9" alt="Profile picture" />
                                                </span>
                                                <span className="nav-link-text">Cat-Lyfe
                    <span className="nav-link-numbers">2</span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>

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
)}

export default MySideNav
