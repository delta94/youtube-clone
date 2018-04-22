import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as actions from './actions/index';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './components/LoginPage';

class App extends Component {
    constructor(props) {
        console.log('app render');
        super(props);
        this.props.fetchUser();
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route path='/' component={LandingPage} exact />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/signup' component={SignupPage} />
                        <Route component={NotFoundPage} />
                    </Switch>    
                </div>    
            </BrowserRouter>    
        );
    }
}

export default connect(null, actions)(App);
