import { fromEvent, map, merge, of, scan } from 'rxjs';
import { BAR_POSITION_Y, BAR_START_POSITION_X } from 'constants/position';
import { getDirectionByKey, move } from 'features/physics/utils';
import { makeArrayStartingWithOne } from 'utils/array';
import { BAR_HALF_SIZE } from 'constants/size';

export const barPositionX$ = merge(
  of(BAR_START_POSITION_X),
  fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map(({ key }) => getDirectionByKey(key)),
    scan((position, direction) => move(position, direction), BAR_START_POSITION_X),
  ),
);

export const barBodyPositions$ = barPositionX$.pipe(
  map(barPositionX =>
    makeArrayStartingWithOne(BAR_HALF_SIZE).reduce(
      (acc, distance) => [...acc, [barPositionX + distance, BAR_POSITION_Y], [barPositionX - distance, BAR_POSITION_Y]],
      [[barPositionX, BAR_POSITION_Y]] as number[][],
    ),
  ),
);
