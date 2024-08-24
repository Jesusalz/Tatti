import React, { useState, useEffect } from 'react';
import './App.css';
import IndicadorTurno from './components/IndicadorTurno';
import Historial from './components/Historial';
import Tablero from './components/Tablero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo, faMoon, faSun, faGamepad } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [esX, setEsX] = useState(true);
  const [ganador, setGanador] = useState(null);
  const [modoContraComputadora, setModoContraComputadora] = useState(false);
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (modoContraComputadora && !esX && !ganador) {
      const emptySquares = squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      const randomIdx = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      if (randomIdx !== undefined) {
        handleClick(randomIdx);
      }
    }
  }, [esX, modoContraComputadora, ganador, squares]);

  const handleClick = (i) => {
    if (squares[i] || ganador) return;

    const nuevosSquares = squares.slice();
    nuevosSquares[i] = esX ? 'X' : 'O';
    setSquares(nuevosSquares);

    const nuevoGanador = calcularGanador(nuevosSquares);
    if (nuevoGanador) {
      setGanador(nuevoGanador);
    } else {
      setEsX(!esX);
    }
  };

  const calcularGanador = (squares) => {
    const combinaciones = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of combinaciones) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const reiniciarJuego = () => {
    setSquares(Array(9).fill(null));
    setEsX(true);
    setGanador(null);
    setHistorial([]);
  };

  return (
    <div className={`app ${temaOscuro ? 'tema-oscuro' : 'tema-claro'}`}>
      <h1>Ta T Ti</h1>
      <div>
        <FontAwesomeIcon
          icon={modoContraComputadora ? faGamepad : faGamepad}
          onClick={() => setModoContraComputadora(!modoContraComputadora)}
          title={modoContraComputadora ? 'Modo 2 Jugadores' : 'Modo Contra la Computadora'}
          style={{ cursor: 'pointer', fontSize: '24px', margin: '5px' }}
        />
        <FontAwesomeIcon
          icon={faRedo}
          onClick={reiniciarJuego}
          title="Reiniciar Juego"
          style={{ cursor: 'pointer', fontSize: '24px', margin: '5px' }}
        />
        <FontAwesomeIcon
          icon={temaOscuro ? faSun : faMoon}
          onClick={() => setTemaOscuro(!temaOscuro)}
          title={temaOscuro ? 'Tema Claro' : 'Tema Oscuro'}
          style={{ cursor: 'pointer', fontSize: '24px', margin: '5px' }}
        />
      </div>
      <IndicadorTurno esX={esX} ganador={ganador} />
      <Tablero squares={squares} onClick={(i) => handleClick(i)} />
      <Historial historial={historial} />
    </div>
  );
};

export default App;
