import { fromEvent, map, scan, skipUntil, startWith } from 'rxjs';
import { BAR_POSITION_Y, BAR_START_POSITION_X } from 'constants/position';
import { getDirectionByKey, moveX } from 'features/physics/utils';
import { makeArrayStartingWithOne } from 'utils/array';
import { BAR_HALF_SIZE } from 'constants/size';
import { gameStart$ } from 'features/display/StartButton';

export const barPositionX$ = fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  skipUntil(gameStart$),
  map(({ key }) => getDirectionByKey(key)),
  scan((position, direction) => moveX(position, direction, BAR_HALF_SIZE), BAR_START_POSITION_X),
  startWith(BAR_START_POSITION_X),
);

export const barBodyPositions$ = barPositionX$.pipe(
  map(barPositionX =>
    makeArrayStartingWithOne(BAR_HALF_SIZE).reduce(
      (acc, distance) => [...acc, [barPositionX + distance, BAR_POSITION_Y], [barPositionX - distance, BAR_POSITION_Y]],
      [[barPositionX, BAR_POSITION_Y]] as number[][],
    ),
  ),
);
