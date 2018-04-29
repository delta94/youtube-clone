import './LoginPage.css';
import React, { Component } from 'react';
import axios from 'axios';
import LoginModal from '../LoginModal/LoginModal';
import SignupModal from '../SignupModal/SignupModal';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false,
            usernameI: '',
            passwordI: '',
            usernameU: '',
            passwordU: '',
            reentered_passwordU: ''
        }

        this.handleLoginOnClick = this.handleLoginOnClick.bind(this);
        this.handleCreateAccountOnClick = this.handleCreateAccountOnClick.bind(this);
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
        this.setState({ signupModalOn: false, loginModalOn: false });
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
        this.setState((prevState) => ({ toggle: !prevState.toggle }))
    }

    handleLoginAccountOnClick() {
        console.log('asdfsdfadddddddddddd');
        this.setState((prevState) => ({toggle: !prevState.toggle}))
    }

    render() {
        return (
            <div>
                {!this.state.toggle ?
                    <LoginModal
                        handleCreateAccountOnClick={this.handleCreateAccountOnClick}
                        handleUsernameOnChange={this.handleUsernameOnChangeI}
                        handlePasswordOnChange={this.handlePasswordOnChangeI}
                        handleOnSubmit={this.handleOnSubmitI}
                        username={this.state.usernameI} />
                    :
                    <SignupModal
                        handleLoginAccountOnClick={this.handleLoginAccountOnClick}
                        handleUsernameOnChange={this.handleUsernameOnChangeU}
                        handlePasswordOnChange={this.handlePasswordOnChangeU}
                        handleReenterdPasswordOnChange={this.handleReenteredPasswordOnChangeU}
                        handleOnSubmit={this.handleOnSubmitU}
                        username={this.usernameU} />
                }
            </div>
        )
    }
}    
export default LoginPage;