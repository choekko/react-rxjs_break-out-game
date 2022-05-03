import React from 'react';
import VGameDisplay from 'features/display/vacs/VGameDisplay';
import { bind } from '@react-rxjs/core';
import { barBodyPositions$ } from 'features/physics/streams/barStream';
import { useGameStart } from 'features/display/StartButton';

const [useBarBodyPositions] = bind(barBodyPositions$);

function GameDisplay() {
  const barBodyPositions = useBarBodyPositions();
  const isStarted = useGameStart();
  const positions = [...barBodyPositions];

  return <VGameDisplay positions={positions} isStarted={isStarted} />;
}

export default GameDisplay;
