import React, { Component } from 'react';
import logo from './logo.svg';
import ButtonWithText from '../../components/ButtonWithText'

class HomePage extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Web-Wesh</h1>
          <p style={{"color":"#777"}}>Créons ensemble le prochain Wesh !</p>
          <p> OUAI !</p>
        </header>
        <ButtonWithText/>
      </div>
    );
  }
}

export default HomePage;
