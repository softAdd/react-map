import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Mark = ({ mark, deletePoint }) => {
  const [{ isDragging }, drag] = useDrag({
    item: {
      type: ItemTypes.MARK,
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <div className="point-item" ref={drag}>
      <p className="point-name">{mark.title}</p>
      <span className="point-delete" onClick={deletePoint}>x</span>
    </div>
  );
}

export default Mark