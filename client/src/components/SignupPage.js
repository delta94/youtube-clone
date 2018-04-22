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
                signup

                <form onSubmit={this.handleOnSubmit}>
                    Username: <br />
                    <input name='username' type='text' value={this.state.username} onChange={this.handleUsernameOnChange} /> <br />
                    Password: <br />
                    <input name='password' type='text' value={this.state.password} onChange={this.handlePasswordOnChange} /> <br />
                    Re enter password: <br/>

                    <input name='reentered-password' type='text' value={this.state.reentered_password} onChange={this.handleReenteredPasswordOnChange} /> <br />
                    <input type='submit' value='Submit' />
                </form>  
            </div>
        );
    }
}

export default SignupPage;
