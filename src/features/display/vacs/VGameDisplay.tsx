/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { DISPLAY_SIZE } from 'constants/size';
import { X_COORDINATE, Y_COORDINATE } from 'constants/position';

export interface VGameDisplayProps {
  positions: number[][];
}

function VGameDisplay({ positions }: VGameDisplayProps) {
  return (
    <table css={gameDisplayStyle}>
      <tbody>
        {Y_COORDINATE.reverse().map(positionY => (
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
  );
}

const gameDisplayStyle = css`
  width: ${DISPLAY_SIZE.WIDTH * DISPLAY_SIZE.UNIT}px;
  height: ${DISPLAY_SIZE.HEIGHT * DISPLAY_SIZE.UNIT}px;
  background-color: skyblue;
`;

const gameDisplayTdStyle = (isValid: boolean) => css`
  background-color: ${isValid ? 'pink' : 'skyblue'};
`;

export default VGameDisplay;
