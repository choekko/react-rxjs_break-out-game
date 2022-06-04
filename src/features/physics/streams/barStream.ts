import { EMPTY, fromEvent, map, scan, startWith, switchMap } from 'rxjs';
import { BAR_POSITION_Y, BAR_START_POSITION_X } from 'constants/initialValue';
import { getDirectionByKey, moveX } from 'features/physics/utils';
import { makeArrayStartingWithOne } from 'utils/array';
import { BAR_HALF_SIZE } from 'constants/size';
import { gameStart$ } from 'features/display/StartButton';

export const barPositionX$ = gameStart$.pipe(
  switchMap(isStarted =>
    isStarted
      ? fromEvent<KeyboardEvent>(document, 'keydown').pipe(
          map(({ key }) => getDirectionByKey(key)),
          scan((position, direction) => moveX(position, direction, BAR_HALF_SIZE), BAR_START_POSITION_X),
          startWith(BAR_START_POSITION_X),
        )
      : EMPTY,
  ),
  startWith(BAR_START_POSITION_X),
);

export const barBodyPositions$ = barPositionX$.pipe(
  map(barPositionX =>
    makeArrayStartingWithOne(BAR_HALF_SIZE).reduce(
      (acc, distance) => [[barPositionX - distance, BAR_POSITION_Y], ...acc, [barPositionX + distance, BAR_POSITION_Y]],
      [[barPositionX, BAR_POSITION_Y]] as number[][],
    ),
  ),
);
