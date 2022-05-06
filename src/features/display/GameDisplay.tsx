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
import { BAR_SIZE, DISPLAY_SIZE } from 'constants/size';
import { Direction } from 'types/physics';
import { BAR_POSITION_Y } from 'constants/position';

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
    const leftMostXOfBar = barBodyPositions[0][0];
    const rightMostXOfBar = barBodyPositions[BAR_SIZE - 1][0];

    const nextBallPositionY = ballPositionY + ballDirectionY;
    const hitsTopBottomWall = nextBallPositionY > DISPLAY_SIZE.HEIGHT - 1 || nextBallPositionY < 0;
    const hitsTopOfBar =
      leftMostXOfBar <= ballPositionX && ballPositionX <= rightMostXOfBar && nextBallPositionY === BAR_POSITION_Y;
    if (hitsTopBottomWall || hitsTopOfBar) {
      if (hitsTopOfBar) console.log('top');
      return 'hitY';
    }

    const nextBallPositionX = ballPositionX + ballDirectionX;
    const hitsLeftRightWall = nextBallPositionX > DISPLAY_SIZE.WIDTH - 1 || nextBallPositionX < 0;
    const hitsSideOfBar =
      BAR_POSITION_Y <= ballPositionY &&
      ballPositionY <= BAR_POSITION_Y + 1 &&
      (nextBallPositionX === leftMostXOfBar || nextBallPositionX === rightMostXOfBar);
    if (hitsLeftRightWall || hitsSideOfBar) {
      if (hitsSideOfBar) console.log('side');
      return 'hitX';
    }

    return null;
  };

  const hitInfo = checkBallHit();
  if (hitInfo === 'hitY') {
    setBallDirectionY(-ballDirectionY as Direction);
  }
  if (hitInfo === 'hitX') {
    setBallDirectionX(-ballDirectionX as Direction);
  }

  const positions = [...barBodyPositions, ballPosition];

  return <VGameDisplay positions={positions} isStarted={isStarted} />;
}

export default GameDisplay;
