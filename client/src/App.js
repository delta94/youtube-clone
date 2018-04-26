import React, { Component } from 'react';
import router from './router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from 'react-sidenav';
import { BrowserRouter } from 'react-router-dom';

import SideNav, { Nav, NavIcon, NavText } from 'react-sidenav';

import './reset.css';
import './App.css';
// import './../HamburgerDropdown.css';


class App extends Component {

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


export default App;
