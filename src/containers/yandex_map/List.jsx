import React from 'react';
import { useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'

import Mark from './Mark';

const PointList = ({ marks, deletePoint }) => {
  const [{ canDrop, isOVer }, drop] = useDrop({
    accept: ItemTypes.MARK,
    drop: () => ({ name: 'PointList' }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  return (
    <div className="point-list">
      {marks.map((mark, index) => (
        <Mark key={`point-${index}`} mark={mark} deletePoint={() => { deletePoint(mark) }} />
      ))}
    </div>
  );
}

export default PointList;