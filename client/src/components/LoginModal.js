import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactDom from 'react-dom';

class LoginModal extends Component {
    render() {
        return (
            <Modal
                isOpen={false}
                onRequestClose={true}>
                <div>
                    <div className="z-depth-1 grey lighten-4 row" style={{ display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE" }}>

                        <form className="col s12" onSubmit={this.handleOnSubmit}>
                            <div className='row'>
                                <div className='col s12'>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input className='validate'  type='text'  placeholder="Enter your username" />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='input-field col s12'>
                                    <input className='validate' type='password' placeholder="Enter your password" />
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
            </Modal>    
        );
    }
}

export default LoginModal;
