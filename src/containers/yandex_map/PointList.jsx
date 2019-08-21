import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableItemWrapper from '../../components/drag_and_drop/DraggableItemWrapper';
import DroppableWrapper from '../../components/drag_and_drop/DroppableWrapper';

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

  onDragEnd = result => {
    console.log(result);
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
              <span className="point-delete" onClick={() => { this.deletePoint(mark) }}>x</span>
            </div>
          ))}
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <DroppableWrapper droppableId={'point-list'} className='point-list'>
            <DraggableItemWrapper draggableId={1} index={0} className={'point-item'}>
              <p >Some text</p>
            </DraggableItemWrapper>
            <DraggableItemWrapper draggableId={2} index={1} className={'point-item'}>
              <p>Another some text</p>
            </DraggableItemWrapper>
          </DroppableWrapper>
        </DragDropContext>
      </div>
    );
  }
}

PointList.propTypes = {
  addMark: PropTypes.func.isRequired,
  removeMark: PropTypes.func.isRequired,
}

export default PointList;
