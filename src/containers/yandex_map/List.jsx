import React from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

import Mark from './Mark';

const PointList = ({ marks, deletePoint }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.MARK,
    drop: () => console.log('dropped'),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })
  return (
    <div className="point-list" ref={drop}>
      {marks.map((mark, index) => (
        <Mark key={`point-${index}`} mark={mark} deletePoint={() => { deletePoint(mark) }} />
      ))}
    </div>
  );
}

export default PointList;