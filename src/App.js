import React, { Component } from 'react';
import './app.css';
import YandexMap from './containers/YandexMap';
import PointList from './containers/PointList';

class App extends Component {
  render() {
    return (
      <div className="app">
        <PointList />
        <YandexMap />
      </div>
    );
  }
}

export default App;