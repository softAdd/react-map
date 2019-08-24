import React from 'react';

import Mark from './Mark';

const PointList = ({ marks, deletePoint, moveMark }) => {
  return (
    <div className="point-list">
      {marks.map((mark, index) => (
        <Mark 
          key={`point-${index}`} 
          mark={mark} 
          deletePoint={() => { deletePoint(mark) }} 
          moveMark={moveMark} 
          index={index}
        />
      ))}
    </div>
  );
}

export default PointList;