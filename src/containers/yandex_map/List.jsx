import React from 'react';

import Mark from './Mark';

const PointList = ({ marks, deletePoint }) => {
  return (
    <div className="point-list">
      {marks.map((mark, index) => (
        <Mark key={`point-${index}`} mark={mark} deletePoint={() => { deletePoint(mark) }} />
      ))}
    </div>
  );
}

export default PointList;