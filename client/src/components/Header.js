import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/base.css';

class Header extends Component {
    constructor(props) {
        super(props);

    }
    renderContent() {
        switch(this.props.auth) {
            case null: 
                return 'Still deciding';
            case false:
                return (
                    <li>
                        <div>
                            <Link to='/login' style={{ float: "left" }}>Login</Link>
                            <Link style={{ float: "left" }} to='/signup'>Signup</Link>  
                        </div>    
                    </li>    
                )
            default: 
                return (
                    <li>
                        <div>
                            <a style={{ float: "left" }}>{this.props.auth.username}</a>
                            <a style={{ float: "left" }} href='/api/logout'>Logout</a>
                        </div>
                    </li>    
                )
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <ul className="left left-header">
                        <li> 
                            <Link to={this.props.auth ? '/surveys' : '/'} style={{ float: "left" }} className="left logo">MyApp</Link>      
                        </li>    
                    </ul>
                    <div style={{ float: "left", width:"50%", marginLeft:"10px"}} >
                        <form >
                            <input required placeholder="Search" type="text" style={{ color: "white" }}/>
                        </form>
                    </div>    
                    <ul id="nav-mobile" className="right right-header">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
}

export default connect(mapStateToProps)(Header);
