import React, { useEffect } from 'react';
import { barPosition$ } from 'features/physics/barStream';
import VGameDisplay from 'features/display/vacs/VGameDisplay';

function GameDisplay() {
  useEffect(() => {
    barPosition$.subscribe();
  }, []);

  const positions = [
    [3, 5],
    [7, 8],
  ];

  return <VGameDisplay positions={positions} />;
}

export default GameDisplay;
