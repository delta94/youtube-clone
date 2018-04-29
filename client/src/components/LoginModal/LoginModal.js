import './LoginModal.css';
import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDom from 'react-dom'; Modal.setAppElement('#root');

class LoginModal extends Component {
    render() {
        return (
                <div className="login-form" style={{ padding: "10px 20px" }}>
                    <form onSubmit={this.props.handleOnSubmit}>
                    <h2 className="text-center">Log in</h2>
                    <p>&ensp;</p>
                        <div className="form-group">
                            <input type="text" name="username" autoFocus className="form-control" placeholder="Username"  value={this.props.username} required="required" onChange={this.props.handleUsernameOnChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required" onChange={this.props.handlePasswordOnChange}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                    <div className="clearfix" style={{ textAlign: "center" }}>
                          <a href="#" className="right" >Forgot Password?</a>
                        </div>
                        <div>
                            <p> &ensp;</p>    
                            <p className="text-center">No account?<span>&ensp;</span><a onClick={this.props.handleCreateAccountOnClick} href="#">Create one here!</a></p>
                        </div>    
                    </form>
                </div>      
        );
    }
}

export default LoginModal;
