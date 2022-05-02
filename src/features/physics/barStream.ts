import { fromEvent, map, merge, of, scan, tap } from 'rxjs';
import { Direction } from 'types/physics';
import { DISPLAY_SIZE } from 'constants/size';

export const barPositionX$ = merge(
  of(1),
  fromEvent<KeyboardEvent>(document, 'keydown').pipe(
    map(({ key }) => getDirectionByKey(key)),
    scan((position, direction) => move(position, direction), 1),
    tap(e => console.log(e)),
  ),
);

const getDirectionByKey = (key: KeyboardEvent['key']): Direction => {
  switch (key) {
    case 'ArrowLeft':
      return -1;
    case 'ArrowRight':
      return 1;
    default:
      return 0;
  }
};

const move = (prevPosition: number, direction: Direction) => {
  const nextPosition = prevPosition + direction;
  if (DISPLAY_SIZE.WIDTH < nextPosition || nextPosition < 0) {
    return prevPosition;
  }
  return nextPosition;
};
