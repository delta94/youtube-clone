import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import axios from 'axios';
import SideBar from './SideBar';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginModalOn: false,
            signupModalOn: false,
            usernameI: '',
            passwordI: '',
            usernameU: '',
            passwordU: '',
            reentered_passwordU: ''
        }

        this.handleLoginOnClick = this.handleLoginOnClick.bind(this);
        this.handleCreateAccountOnClick = this.handleCreateAccountOnClick.bind(this);
        this.handleCloseButtonOnClick = this.handleCloseButtonOnClick.bind(this);
        this.handleSignupOnClick = this.handleSignupOnClick.bind(this);
        this.handleLoginAccountOnClick = this.handleLoginAccountOnClick.bind(this);

        this.handleUsernameOnChangeI = this.handleUsernameOnChangeI.bind(this);
        this.handlePasswordOnChangeI = this.handlePasswordOnChangeI.bind(this);
        this.handleOnSubmitI = this.handleOnSubmitI.bind(this);

        this.handleUsernameOnChangeU = this.handleUsernameOnChangeU.bind(this);
        this.handlePasswordOnChangeU = this.handlePasswordOnChangeU.bind(this);
        this.handleOnSubmitU = this.handleOnSubmitU.bind(this);
        this.handleReenteredPasswordOnChangeU = this.handleReenteredPasswordOnChangeU.bind(this);
    }

    handleUsernameOnChangeI(e) {
        this.setState({ usernameI: e.target.value })
    }

    handlePasswordOnChangeI(e) {
        this.setState({ passwordI: e.target.value })
    }

    handleOnSubmitI(e) {
        e.preventDefault();
        console.log(this.state.usernameI, this.state.passwordI);
        axios.post('/auth/local', {
            username: this.state.usernameI,
            password: this.state.passwordI
        }).then(res => {
            console.log(res);
            if (!res.data.success) {
                console.log('not sucess');
            } else {
                window.location.href = "/";
            }
        });
    }

    handleUsernameOnChangeU(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordOnChangeU(e) {
        this.setState({ password: e.target.value });
    }

    handleReenteredPasswordOnChangeU(e) {
        this.setState({ reentered_password: e.target.value });
    }


    handleCloseButtonOnClick() {
        console.log('close');
        this.setState({signupModalOn:false, loginModalOn:false });
    }

    handleLoginOnClick() {
        this.setState({ loginModalOn: true });
    }

    handleOnSubmitU(e) {
        e.preventDefault();

        axios.post('api/signup', { username: this.state.username, password: this.state.password }).then(res => {
            if (!res.data.success) {
                console.log('usrname already exists');
            } else {
                this.handleLoginAccountOnClick();
            }
        })
    }

    handleSignupOnClick() {
        this.setState({ signupModalOn: true });
    }

    handleCreateAccountOnClick() {
        console.log('adfalskj');
        this.setState({ loginModalOn: false, signupModalOn: true });
    }

    handleLoginAccountOnClick() {
        console.log('asdfsdfadddddddddddd');
        this.setState({ loginModalOn: true, signupModalOn: false });
    }

    renderContent() {
        switch(this.props.auth) {
            case null: 
                return 'Still deciding';
            case false:
                return (
                    <ul className="nav navbar-nav navbar-right">
                        <li><a onClick={this.handleLoginOnClick}>Login </a></li>
                        <li><a className="signup-btn" onClick={this.handleSignupOnClick}>Signup</a></li>
                    </ul>
                )
            default: 
                return (
                    <ul className="nav navbar-nav navbar-right" >
                        <li className="dropdown" >
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img src="temp.jpg" className="img-circle" alt="Cinque Terre" width="30px" height="30px" />  <span className="caret"></span></a>
                            <ul className="dropdown-menu" style={{ width: "275px" }}>
                                <li>
                                    <div style={{ height: "60px", cursor: "pointer", backgroundColor: "#dfdfdf", paddingBottom: "10px", paddingTop: "1px" }} className="clearfix">
                                        <div style={{
                                            float: "left", verticalAlign: "middle", lineHeight: "60px", padding: "0 5px 0 20px"
                                        }}><img src="temp.jpg" className="img-circle" alt="Cinque Terre" width="35px" height="35px" /> </div>
                                        <div style={{ float: "left", padding: "5px 15px", verticalAlign: "middle" }}>
                                            <p style={{marginBottom:"5px", marginTop:"5px"}}><b>{this.props.auth.username}</b></p>
                                            <p style={{ margin: 0 }}>{this.props.auth.gmail || "sample@gmail.com"}</p>
                                        </div>

                                    </div>

                                </li>
                                <li><a style={{ padding: "10px 10px 10px 30px" }} ><i className="glyphicon glyphicon-cd" style={{ color: "#666666" }} />&ensp;&ensp;&ensp;My channel</a></li>
                                <li><a style={{ padding: "10px 10px 10px 30px" }} href="/api/logout"><span className="glyphicon glyphicon-log-out" style={{ color: "#666666" }} />&ensp;&ensp;&ensp;Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                )
        }
    }
    render() {
        return (
            <div>
                <LoginModal on={this.state.loginModalOn}
                    handleCreateAccountOnClick={this.handleCreateAccountOnClick}
                    handleCloseButtonOnClick={this.handleCloseButtonOnClick}
                    handleUsernameOnChange={this.handleUsernameOnChangeI}
                    handlePasswordOnChange={this.handlePasswordOnChangeI}
                    handleOnSubmit={this.handleOnSubmitI}
                    username={this.state.usernameI}
                />  
                <SignupModal
                    on={this.state.signupModalOn}
                    handleLoginAccountOnClick={this.handleLoginAccountOnClick}
                    handleCloseButtonOnClick={this.handleCloseButtonOnClick}
                    handleUsernameOnChange={this.handleUsernameOnChangeU}
                    handlePasswordOnChange={this.handlePasswordOnChangeU}
                    handleReenterdPasswordOnChange={this.handleReenteredPasswordOnChangeU}
                    handleOnSubmit={this.handleOnSubmitU}
                    username={this.usernameU}
                />
            
                <nav className="navbar-fixed-top navbar navbar-light" style={{ backgroundColor: "white", boxShadow: "0 4px 10px 0 rgba(0, 0, 0, 0.05), 0 3px 6px 0 rgba(0, 0, 0, 0.05)" }} >
                    <div className="container-fluid">
                        <div className="navbar-header  col-sm-3">
                            <button type="button" className="navbar-toggle collapsed" >
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" id='brand-logo' href="#"><img src="logo.png" width="150px"/></a>
                        </div>

                        <div className="collapse navbar-collapse">
                            <form className="navbar-form navbar-left input-group" >
                                <div className="form-group" >
                                        <input type="text" className="form-control" placeholder="Search" />  
                                        <button className="btn btn-default" type="submit">
                                            <i className="glyphicon glyphicon-search" style={{color: "#666666"}}></i>
                                        </button>
                                </div>
                            </form>

                            {this.renderContent()}
                        </div>

                    </div>
                </nav>
                
                <SideBar />
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
