import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SimonGame from './components/SimonGame.js';
import SimonGameStore from './components/SimonGameStore';
import {Provider} from 'mobx-react';

class App extends Component {
  render() {

    let simonGameStore = new SimonGameStore();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Simon</h1>
        </header>
          <Provider simonGameStore={simonGameStore}>
            <SimonGame />
          </Provider>
      </div>
    );
  }
}

export default App;
