import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDom from 'react-dom'; Modal.setAppElement('#root');

class SignupModal extends Component {
    render() {
        return (
            <Modal
                isOpen={this.props.on}
                closeTimeoutMS={200}
                ariaHideApp={false}
                className="Modal"
                overlayClassName="Overlay"
                onRequestClose={this.props.handleCloseButtonOnClick}
            >

                <div className="login-form">
                    <button type="button" onClick={this.props.handleCloseButtonOnClick} className="close" style={{ top: "10px", right: "10px", position: "relative" }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <form onSubmit={this.props.handleOnSubmit}>
                        <h2 className="text-center">Sign up</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" autoFocus placeholder="Username" value={this.props.username} required="required" onChange={this.props.handleUsernameOnChange}/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="Password" required="required" onChange={this.props.handlePasswordOnChange}/>
                        </div>

                        <div className="form-group">
                            <input type="password" className="form-control" onChange={this.props.handleReenterdPasswordOnChange} placeholder="Reenter password" required="required" />
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                        </div>

                        <div>
                            <p></p>
                            <p className="text-center">Already have an account?<a onClick={this.props.handleLoginAccountOnClick} href="#"> Sign in here!</a></p>
                        </div>
                    </form>
                </div>
            </Modal>
        );
    }
}

export default SignupModal;
