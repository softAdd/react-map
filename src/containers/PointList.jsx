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
            <div className="point-item">
              <p className="point-name">{point}</p>
              <span class="point-delete" id={`point-delete-${index}`}>x</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default PointList;