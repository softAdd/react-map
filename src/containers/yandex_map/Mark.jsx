import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

const Mark = ({ mark, deletePoint, moveMark, index }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.MARK,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveMark(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.MARK,
    }
  });
  drag(drop(ref));
  return (
    <div className="point-item" ref={ref}>
      <p className="point-name">{mark.title}</p>
      <span className="point-delete" onClick={deletePoint}>x</span>
    </div>
  );
}

export default Mark