import React from 'react';
import { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import MySideNav from './HamburgerDropdown/HamburgerDropdown';
import './Header.css';
import logo from './img/logo.png';
import search from './img/search_icon.png';
import notification from './img/notification.png';
import signIn from './img/photo.jpg';
import { connect } from 'react-redux';
import axios from 'axios';

class Header extends Component {
    constructor(){
        super()
        this.state = {
            switcher : false,
            css :	{
                visibility: "hidden" 
            },
            searchInput: '',
        }

        this.cssSwitch = this.cssSwitch.bind(this);
        this.toggle = this.toggle.bind(this);   
        this.handleInputChange = this.handleInputChange.bind(this); 

    };

    handleInputChange( event ){
        this.setState({
            searchInput: event.target.value,
        })
    }

    cssSwitch(value){
        if(value){
            this.setState({css: 
                {visibility: "hidden", }
            })
            return this.state.css;
        }
        else if(value === false){
            this.setState({css:
                {
                    visibility: "visible",
                    boxShadow: '3px 5px 1px rgba(0,0,0,.1)',
                    backgroundColor: '#fff', 
                    color: '#444444',
                    width: 250, 
                    paddingTop:'0px', 
                    position: 'fixed', 
                    top: '56px',
                    zIndex: '1700'
                }
            })
            return this.state.css;
        }
    }


    toggle(){
        this.setState({switcher : !this.state.switcher})
        return this.cssSwitch(this.state.switcher)
    } 

    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return <ul id="notification_signin"><li><Link to='/login' className="btn btn-danger">Login</Link></li></ul>
            default:
                return (
                    <div>
                        <section className="upload">
                            <Link to='/upload' >
                                <div id="upload" />
                            </Link>                            
                        </section>
                        
                        <ul id="notification_signin">
                            <li id="notifications"></li>
                            <li>
                                <div className="dropdown" >
                                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="temp.jpg" className="img-circle" alt="Cinque Terre" width="30px" height="30px" /></a>
                                    <ul className="dropdown-menu" style={{ width: "250px" }}>
                                        <li>
                                            <div style={{ height: "60px", cursor: "pointer", backgroundColor: "#dfdfdf", paddingBottom: "10px", paddingTop: "1px" }} className="clearfix">
                                                <div style={{
                                                    float: "left", verticalAlign: "middle", lineHeight: "60px", padding: "0 5px 0 20px"
                                                }}><img src="temp.jpg" className="img-circle profile-image" alt="Cinque Terre" width="35px" height="35px" /> </div>
                                                <div style={{ float: "left", padding: "8px 15px", verticalAlign: "middle" }}>
                                                    <p style={{ marginBottom: "5px", marginTop: "5px", fontWeight: "bold" }}><b>asfasfdsdf</b></p>
                                                    <p style={{ margin: 0 }}>asfsafafd</p>
                                                </div>

                                            </div>

                                        </li>
                                        <li><a style={{ padding: "10px 10px 10px 30px" }} ><i className="glyphicon glyphicon-cd" style={{ color: "#666666" }} />&ensp;&ensp;&ensp;My channel</a></li>
                                        <li><a style={{ padding: "10px 10px 10px 30px" }} href="/api/logout"><span className="glyphicon glyphicon-log-out" style={{ color: "#666666" }} />&ensp;&ensp;&ensp;Log out</a></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>  
                )
        }
    }

    render() {
        return (
            <section className="main_header_section">
                <div className="main_header_div">
                    <ul id="menu_logo">
                        <li className="header_hamburger" onClick={() => this.toggle()}>
                            <div className="hamburger_bar"></div>
                            <div className="hamburger_bar"></div>
                            <div className="hamburger_bar"></div>
                        </li>
                        <Link to="/">
                            <li className="header_logo">
                                <img src={logo} />
                            </li>
                        </Link>
                    </ul>
                    <section className="header_search">
                        <input onChange={this.handleInputChange} placeholder="Search" id="searchbar" />
                        <Link to={'/search/' + this.state.searchInput}>
                            <div id="search_bttn">
                                <div className="search_img"></div>
                            </div>
                        </Link>
                    </section>
                    {this.renderContent()}
                </div>
                <MySideNav style={this.state.css} />
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
}

export default connect(mapStateToProps)(Header);

