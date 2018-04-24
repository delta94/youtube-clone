import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null: 
                return 'Still deciding';
            case false:
                return (
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                )
            default: 
                return (
                    <div>
                        <h3>{this.props.auth.username}</h3>
                        <a href='/api/logout'>Logout</a>
                    </div>
                )
        }
    }
    render() {
        return (
            <div>
                <LoginModal/>    
                <Link to='/'>This is my logo</Link>
                {this.renderContent()}
                <video src="/watch/2" type="video/mp4" controls autoplay={true} width={400}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
}

export default connect(mapStateToProps)(Header);
