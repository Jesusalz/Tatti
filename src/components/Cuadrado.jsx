import React from 'react';

const Cuadrado = ({ value, onClick }) => {
  return (
    <button className="cuadrado" onClick={onClick}>
      {value}
    </button>
  );
};

export default Cuadrado;
