import React, { Component } from 'react';

class PointList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      points: [],
    }
  }

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleInputKey = event => {
    if (event.key === 'Enter') {
      let text = event.target.value;
      this.setState({
        inputValue: '',
        points: [...this.state.points, text],
      })
    }
  }

  deletePoint = event => {
    let arrPoints = this.state.points.slice();
    let index = event.target.id.split('-')[2];
    arrPoints.splice(index, 1);
    this.setState({
      points: arrPoints,
    });
  }

  render() {
    const { points } = this.state;
    return (
      <div className="point-list-container">
        <input type="text"
          autoComplete="off"
          placeholder="press enter to add point"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKey}
        />
        <div className="point-list">
          {points.map((point, index) => (
            <div key={`point-${index}`} className="point-item">
              <p className="point-name">{point}</p>
              <span className="point-delete" id={`point-delete-${index}`} onClick={this.deletePoint}>x</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PointList;