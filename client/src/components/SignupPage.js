import React, { Component } from 'react';
import axios from 'axios';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.handleUsernameOnChange = this.handleUsernameOnChange.bind(this);
        this.handlePasswordOnChange = this.handlePasswordOnChange.bind(this);
        this.handleReenteredPasswordOnChange = this.handleReenteredPasswordOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            reentered_password: ''
        }
    }

    handleUsernameOnChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordOnChange(e) {
        this.setState({ password: e.target.value });
    }

    handleReenteredPasswordOnChange(e) {
        this.setState({ reentered_password: e.target.value });
    }

    handleOnSubmit(e) {
        e.preventDefault();

        axios.post('api/signup', { username: this.state.username, password: this.state.password }).then(res => {
            if (!res.data.success) {
                console.log('usrname already exists');
            } else {
                this.props.history.push('/login');
            }
        })
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
                                        <input className='validate' value={this.state.username} type='text' value={this.state.username} onChange={this.handleUsernameOnChange} placeholder="Enter your username" />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate' value={this.state.password} type='password' value={this.state.password} onChange={this.handlePasswordOnChange} placeholder="Enter your password" />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='input-field col s12'>
                                        <input className='validate'  type='password' value={this.state.reentered_password} onChange={this.handleReenteredPasswordOnChange} placeholder="Re-enter your password" />
                                    </div>
                                </div>

                                <br />
                                <center>
                                    <div className='row'>
                                        <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Create</button>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>
                </center>

            </div>
        );
    }
}

export default SignupPage;
