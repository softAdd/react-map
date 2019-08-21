import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PointList extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = event => {
    this.setState({
      inputValue: event.target.value
    });
  };

  handleInputEnter = event => {
    if (event.key === 'Enter') {
      const title = event.target.value;
      this.setState({
        inputValue: '',
      });
      this.props.addMark(title);
    }
  };

  deletePoint = mark => {
    this.props.removeMark(mark);
  }

  render() {
    const { marks } = this.props;
    return (
      <div className="point-list-container">
        <input
          type="text"
          autoComplete="off"
          placeholder="press enter to add point"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputEnter}
        />
        <div className="point-list">
          {marks.map((mark, index) => (
            <div className="point-item"  key={`point-${index}`}>
              <p className="point-name">{mark.title}</p>
              <span className="point-delete" onClick={mark => { this.deletePoint(mark) }}>x</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

PointList.propTypes = {
  addMark: PropTypes.func.isRequired,
  removeMark: PropTypes.func.isRequired,
}

export default PointList;
