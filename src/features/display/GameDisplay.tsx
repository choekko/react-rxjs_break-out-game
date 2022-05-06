import React from 'react';
import VGameDisplay from 'features/display/vacs/VGameDisplay';
import { bind } from '@react-rxjs/core';
import { barBodyPositions$ } from 'features/physics/streams/barStream';
import { useGameStart } from 'features/display/StartButton';
import {
  ballDirectionX$,
  ballDirectionY$,
  ballPosition$,
  setBallDirectionX,
  setBallDirectionY,
} from 'features/physics/streams/ballStream';
import { DISPLAY_SIZE } from 'constants/size';
import { Direction } from 'types/physics';

const [useBarBodyPositions] = bind(barBodyPositions$);
const [useBallPosition] = bind(ballPosition$);
const [useBallDirectionX] = bind(ballDirectionX$, 1);
const [useBallDirectionY] = bind(ballDirectionY$, 1);

function GameDisplay() {
  const isStarted = useGameStart();
  const barBodyPositions = useBarBodyPositions();
  const ballPosition = useBallPosition();
  const [ballPositionX, ballPositionY] = ballPosition;
  const ballDirectionX = useBallDirectionX();
  const ballDirectionY = useBallDirectionY();

  const checkBallHit = (): 'hitX' | 'hitY' | null => {
    const nextBallPositionX = ballPositionX + ballDirectionX;
    if (nextBallPositionX > DISPLAY_SIZE.WIDTH - 1 || nextBallPositionX < 0) {
      return 'hitX';
    }

    const nextBallPositionY = ballPositionY + ballDirectionY;
    if (nextBallPositionY > DISPLAY_SIZE.HEIGHT - 1 || nextBallPositionY < 0) {
      return 'hitY';
    }

    return null;
  };

  const hitInfo = checkBallHit();
  if (hitInfo === 'hitX') {
    setBallDirectionX(-ballDirectionX as Direction);
  }
  if (hitInfo === 'hitY') {
    setBallDirectionY(-ballDirectionY as Direction);
  }

  const positions = [...barBodyPositions, ballPosition];

  return <VGameDisplay positions={positions} isStarted={isStarted} />;
}

export default GameDisplay;
