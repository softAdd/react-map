import React, { Component } from 'react';

class PointList extends Component {
  render() {
    return (
      <div className="point-list-container">
        <input type="text" autoComplete="off" placeholder="enter point name" />
        <div className="point-list"></div>
      </div>
    )
  }
}

export default PointList;