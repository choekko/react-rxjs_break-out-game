import React, { useEffect } from 'react';
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
  setHitTargetPosition,
} from 'features/physics/streams/ballStream';
import { BAR_SIZE, DISPLAY_SIZE } from 'constants/size';
import { Direction } from 'types/physics';
import { BAR_POSITION_Y } from 'constants/position';
import { blockPositions$ } from 'features/physics/streams/blockStream';

const [useBarBodyPositions] = bind(barBodyPositions$);
const [useBallPosition] = bind(ballPosition$);
const [useBallDirectionX] = bind(ballDirectionX$, 1);
const [useBallDirectionY] = bind(ballDirectionY$, 1);
const [useBlockPositions] = bind(blockPositions$);

interface HitInfo {
  hitDirection: 'hitX' | 'hitY' | 'hitCorner';
  hitTargetPosition: [number, number];
}

function GameDisplay() {
  const isStarted = useGameStart();
  const barBodyPositions = useBarBodyPositions();
  const ballPosition = useBallPosition();
  const [ballPositionX, ballPositionY] = ballPosition;
  const ballDirectionX = useBallDirectionX();
  const ballDirectionY = useBallDirectionY();
  const blockPositions = useBlockPositions();

  const checkBallHit = (): HitInfo | null => {
    const leftMostXOfBar = barBodyPositions[0][0];
    const rightMostXOfBar = barBodyPositions[BAR_SIZE - 1][0];

    const nextBallPositionY = ballPositionY + ballDirectionY;
    const hitsTopBottomWall = nextBallPositionY > DISPLAY_SIZE.HEIGHT - 1 || nextBallPositionY < 0;
    const hitsTopOfBar =
      leftMostXOfBar <= ballPositionX && ballPositionX <= rightMostXOfBar && nextBallPositionY === BAR_POSITION_Y;
    const hitsTopBottomOfBlock = blockPositions.some(([x, y]) => x === ballPositionX && y === nextBallPositionY);

    if (hitsTopBottomWall || hitsTopOfBar || hitsTopBottomOfBlock) {
      return {
        hitDirection: 'hitY',
        hitTargetPosition: [ballPositionX, nextBallPositionY],
      };
    }

    const nextBallPositionX = ballPositionX + ballDirectionX;
    const hitsLeftRightWall = nextBallPositionX > DISPLAY_SIZE.WIDTH - 1 || nextBallPositionX < 0;
    const hitsSideOfBar =
      ballPositionY === BAR_POSITION_Y &&
      (nextBallPositionX === leftMostXOfBar || nextBallPositionX === rightMostXOfBar);
    const hitsCornerOfBar =
      ballPositionY === BAR_POSITION_Y + 1 &&
      (nextBallPositionX === leftMostXOfBar || nextBallPositionX === rightMostXOfBar);

    const hitsCornerOfBlock = blockPositions.some(([x, y]) => x === nextBallPositionX && y === nextBallPositionY);
    const hitsSideOfBlock = blockPositions.some(([x, y]) => x === nextBallPositionX && y === ballPositionY);

    if (hitsLeftRightWall || hitsSideOfBar || hitsSideOfBlock) {
      if (hitsSideOfBar) console.log('side');
      return {
        hitDirection: 'hitX',
        hitTargetPosition: [nextBallPositionX, ballPositionY],
      };
    }

    if (hitsCornerOfBar || hitsCornerOfBlock) {
      return {
        hitDirection: 'hitCorner',
        hitTargetPosition: [nextBallPositionX, nextBallPositionY],
      };
    }

    return null;
  };

  const hitInfo = checkBallHit();

  useEffect(() => {
    if (hitInfo) {
      setHitTargetPosition(hitInfo.hitTargetPosition);

      switch (hitInfo.hitDirection) {
        case 'hitCorner':
          setBallDirectionY(-ballDirectionY as Direction);
          setBallDirectionX(-ballDirectionX as Direction);
          break;
        case 'hitY':
          console.log('here');
          setBallDirectionY(-ballDirectionY as Direction);
          break;
        case 'hitX':
          setBallDirectionX(-ballDirectionX as Direction);
          break;
        default:
          break;
      }
    }
  }, [hitInfo, ballDirectionX, ballDirectionY]);

  const positions = [...barBodyPositions, ballPosition, ...blockPositions];

  return <VGameDisplay positions={positions} isStarted={isStarted} />;
}

export default GameDisplay;
