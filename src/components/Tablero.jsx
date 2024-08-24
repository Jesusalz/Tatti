import React from 'react';
import Cuadrado from './Cuadrado';

const Tablero = ({ squares, onClick }) => {
  return (
    <div className="tablero">
      {squares.map((square, i) => (
        <Cuadrado key={i} value={square} onClick={() => onClick(i)} />
      ))}
    </div>
  );
};

export default Tablero;
