import React, { Component } from 'react';
import './app.css';
import YandexMap from './containers/YandexMap';

class App extends Component {
  render() {
    return (
      <div className="app">
        <YandexMap />
      </div>
    );
  }
}

export default App;