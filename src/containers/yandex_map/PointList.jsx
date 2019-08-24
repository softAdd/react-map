import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from './List';

class Container extends Component {
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
        <DndProvider backend={HTML5Backend}>
          <List {...this.props} deletePoint={this.deletePoint} />
        </DndProvider>
      </div>
    );
  }
}

Container.propTypes = {
  addMark: PropTypes.func.isRequired,
  removeMark: PropTypes.func.isRequired,
  moveMark: PropTypes.func.isRequired,
  marks: PropTypes.array.isRequired,
}

export default Container;
