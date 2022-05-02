import React from 'react';
import VGameDisplay from 'features/display/vacs/VGameDisplay';
import { bind } from '@react-rxjs/core';
import { map, tap } from 'rxjs';
import { barPositionX$ } from 'features/physics/barStream';
import { makeArrayStartingWithOne } from 'utils/array';
import { BAR_HALF_SIZE } from 'constants/size';
import { BAR_POSITION_Y } from 'constants/position';

const [useBarBodyPositions] = bind(
  barPositionX$.pipe(
    map(barPositionX =>
      makeArrayStartingWithOne(BAR_HALF_SIZE).reduce(
        (acc, distance) => [
          ...acc,
          [barPositionX + distance, BAR_POSITION_Y],
          [barPositionX - distance, BAR_POSITION_Y],
        ],
        [[barPositionX, BAR_POSITION_Y]] as number[][],
      ),
    ),
    tap(e => console.log(e)),
  ),
);

function GameDisplay() {
  const barBodyPositions = useBarBodyPositions();
  console.log(barBodyPositions);

  const positions = [...barBodyPositions];

  return <VGameDisplay positions={positions} />;
}

export default GameDisplay;
