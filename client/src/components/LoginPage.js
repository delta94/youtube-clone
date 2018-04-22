import React, { Component } from 'react';
import axios from 'axios';
import { fetchUser } from '../actions/index';

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
                login

                <form onSubmit={this.handleOnSubmit}>
                    Username: <br/>
                    <input name='username' value={this.state.username} type='text' value={this.state.username} onChange={this.handleUsernameOnChange}/> <br />
                    Password: <br/>
                    <input name='password' value={this.state.password} type='text' value={this.state.password} onChange={this.handlePasswordOnChange}/> <br />
                    <input type='submit' value='Submit'/>
                </form>    
            </div>
        );
    }
}

export default LoginPage;
