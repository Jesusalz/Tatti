import React from 'react';

const IndicadorTurno = ({ esX, ganador }) => {
  if (ganador) {
    return <div className="indicador">Ganador: {ganador}</div>;
  } else {
    return <div className="indicador">Le toca a: {esX ? 'X' : 'O'}</div>;
  }
};

export default IndicadorTurno;
