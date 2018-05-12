import './NotFoundPage.css';
import React, { Component } from 'react';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="not-found">
                <p>404</p>
                <p><span className="wtf">Oops</span><span className="pnf">... Page Not Found!!!</span></p>
            </div>
        );
    }
}

export default NotFoundPage;
