import React, { Component } from 'react';
import router from './router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from 'react-sidenav';
import { BrowserRouter } from 'react-router-dom';
import * as actions from './actions/index';
import { connect } from 'react-redux';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';
import { fetchUser } from './actions/index';

import './reset.css';
import './App.css';
// import './../HamburgerDropdown.css';


class App extends Component {
    constructor(props) {
        super(props);
        console.log('asdflsafkdj');
        this.props.fetchUser();
    }

    componentWillMount() {
    }

  render() {
    return (
      <div className="App">
            <BrowserRouter>
            <div>        
                <Header />
                { router }
                <Footer />
            </div>        
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions)(App);