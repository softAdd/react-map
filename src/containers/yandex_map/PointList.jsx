import React, { Component } from "react";
import PropTypes from 'prop-types';

class PointList extends Component {
  state = {
    inputValue: "",
    points: []
  };

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleInputKey = event => {
    if (event.key === "Enter") {
      let text = event.target.value;
      this.setState({
        inputValue: "",
        points: [...this.state.points, text]
      });
      this.props.addMark(text);
    }
  };

  deletePoint = event => {
    let arrPoints = this.state.points.slice();
    let index = event.target.id.split("-")[2];
    arrPoints.splice(index, 1);
    this.setState({
      points: arrPoints,
    });
    this.props.removeMark(index);
  };

  render() {
    const { points } = this.state;
    return (
      <div className="point-list-container">
        <input
          type="text"
          autoComplete="off"
          placeholder="press enter to add point"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKey}
        />
        {/* <--- POINT LIST ---> */}
        <div className="point-list">
          {points.map((point, index) => (
            <div key={`point-${index}`} className="point-item">
              <p className="point-name">{point}</p>
              <span
                className="point-delete"
                id={`point-delete-${index}`}
                onClick={this.deletePoint}
              >
                x
              </span>
            </div>
          ))}
        </div>
        {/* <--- POINT LIST ---> */}
      </div>
    );
  }
}

PointList.propTypes = {
  addMark: PropTypes.func.isRequired,
  removeMark: PropTypes.func.isRequired,
}

export default PointList;
