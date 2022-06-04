import { EMPTY, interval, scan, startWith, switchMap, withLatestFrom, zip } from 'rxjs';
import {
  BALL_START_DIRECTION_X,
  BALL_START_DIRECTION_Y,
  BALL_START_POSITION_X,
  BALL_START_POSITION_Y,
} from 'constants/initialValue';
import { BALL_SPEED } from 'constants/size';
import { createSignal } from '@react-rxjs/utils';
import { moveX, moveY } from 'features/physics/utils';
import { Direction } from 'types/physics';
import { gameStart$ } from 'features/display/StartButton';

export const ballInterval$ = interval(Math.floor(1000 / BALL_SPEED));

export const [ballDirectionX$, setBallDirectionX] = createSignal<Direction>();
export const [ballDirectionY$, setBallDirectionY] = createSignal<Direction>();

export const [hitTargetPosition$, setHitTargetPosition] = createSignal<[number, number]>();

export const ballPositionX$ = gameStart$.pipe(
  switchMap(isStarted =>
    isStarted
      ? ballInterval$.pipe(
          withLatestFrom(ballDirectionX$.pipe(startWith(BALL_START_DIRECTION_X))),
          scan((currPosition, [, direction]) => moveX(currPosition, direction), BALL_START_POSITION_X),
          startWith(BALL_START_POSITION_X),
        )
      : EMPTY,
  ),
);

export const ballPositionY$ = gameStart$.pipe(
  switchMap(isStarted =>
    isStarted
      ? ballInterval$.pipe(
          withLatestFrom(ballDirectionY$.pipe(startWith(BALL_START_DIRECTION_Y))),
          scan((currPosition, [, direction]) => moveY(currPosition, direction), BALL_START_POSITION_Y),
          startWith(BALL_START_POSITION_Y),
        )
      : EMPTY,
  ),
);

export const ballPosition$ = zip(ballPositionX$, ballPositionY$).pipe(
  startWith<[number, number]>([BALL_START_POSITION_X, BALL_START_POSITION_Y]),
);
