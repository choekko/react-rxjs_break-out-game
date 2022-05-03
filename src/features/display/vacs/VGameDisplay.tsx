/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { DISPLAY_SIZE } from 'constants/size';
import { X_COORDINATE, Y_COORDINATE } from 'constants/position';
import StartButton from 'features/display/StartButton';

export interface VGameDisplayProps {
  positions: number[][];
  isStarted: boolean;
}

function VGameDisplay({ positions, isStarted }: VGameDisplayProps) {
  return (
    <section css={gameDisplayWrapStyle}>
      <table css={gameDisplayStyle(isStarted)}>
        <tbody>
          {[...Y_COORDINATE].reverse().map(positionY => (
            <tr>
              {X_COORDINATE.map(positionX => (
                <td
                  css={gameDisplayTdStyle(Boolean(positions.find(([x, y]) => x === positionX && y === positionY)))}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!isStarted && (
        <div css={startButtonWrapStyle}>
          <StartButton />
        </div>
      )}
    </section>
  );
}

const gameDisplayWrapStyle = css`
  display: inline-block;
  position: relative;
`;

const gameDisplayStyle = (isStarted: boolean) => css`
  width: ${DISPLAY_SIZE.WIDTH * DISPLAY_SIZE.UNIT}px;
  height: ${DISPLAY_SIZE.HEIGHT * DISPLAY_SIZE.UNIT}px;
  background-color: skyblue;
  opacity: ${isStarted ? 1 : 0.4};
`;

const gameDisplayTdStyle = (isValid: boolean) => css`
  background-color: ${isValid ? 'pink' : 'skyblue'};
`;

const startButtonWrapStyle = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default VGameDisplay;
