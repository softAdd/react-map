import React from 'react';
import { useDrag } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Mark = ({ mark, deletePoint }) => {
  const title = mark.title;
  const [{ isDragging }, drag] = useDrag({
    item: { title, type: ItemTypes.MARK },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log(dropResult)
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1
  return (
    <div ref={drag} className="point-item" style={{ opacity: opacity }}>
      <p className="point-name">{mark.title}</p>
      <span className="point-delete" onClick={deletePoint}>x</span>
    </div>
  );
}

export default Mark