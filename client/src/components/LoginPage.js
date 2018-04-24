import React, { Component } from 'react';
import axios from 'axios';
import { fetchUser } from '../actions/index';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }

        this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
        this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    handleUsernameOnChange(e) {
        this.setState({username: e.target.value})
    }

    handlePasswordOnChange(e) {
        this.setState({ password: e.target.value })
    }

    handleOnSubmit(e) {
        console.log('submit');
        e.preventDefault();
        console.log(this.state.username, this.state.password);
        axios.post('/auth/local', {
            username: this.state.username,
            password: this.state.password
        }).then(res => {
            console.log(res);
            if (!res.data.success) {
                console.log('not sucess');
            } else {
                window.location.href = "/";
            }
        });
    }

    render() {
        return (
            <div>     
                <center>
                    <div className="section"></div>

                    <h5 className="indigo-text">Login to MyApp</h5>
                    <div className="section"></div>

                    <div className="container">
                        <div className="z-depth-1 grey lighten-4 row" style={{ display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE" }}>

                        <form className="col s12" onSubmit={this.handleOnSubmit}>
                                <div className='row'>
                                    <div className='col s12'>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' value={this.state.username} type='text' value={this.state.username} onChange={this.handleUsernameOnChange} placeholder="Enter your username"/>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' value={this.state.password} type='password' value={this.state.password} onChange={this.handlePasswordOnChange} placeholder="Enter your password"/>
                                    </div>
                                    <label style={{ float: "right" }}>
                                        <a className='pink-text' href='#!'><b>Forgot Password?</b></a>
                                    </label>
                                </div>

                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                                    </div>
                                </center>
                        </form>
                        </div>
                    </div>
                    <Link to='/signup'>Create account</Link>
                </center>
            </div>
        );
    }
}

export default LoginPage;
