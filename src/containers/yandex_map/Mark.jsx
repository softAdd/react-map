import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Mark = ({ mark, deletePoint }) => {
  const title = mark.title;
  const [{ isDragging }, drag] = useDrag({
    item: { title, type: ItemTypes.MARK },
  });
  return (
    <div ref={drag} className="point-item">
      <p className="point-name">{mark.title}</p>
      <span className="point-delete" onClick={deletePoint}>x</span>
    </div>
  );
}

export default Mark