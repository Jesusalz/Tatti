import React from 'react';

const Historial = ({ historial }) => {
  return (
    <div className="historial">
      <h2>Historial</h2>
      <ul>
        {historial.map((movimiento, index) => (
          <li key={index}>{movimiento}</li>
        ))}
      </ul>
    </div>
  );
};

export default Historial;
