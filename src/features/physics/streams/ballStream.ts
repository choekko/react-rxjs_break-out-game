import { interval, scan, skipUntil, startWith, withLatestFrom, zip } from 'rxjs';
import { BALL_START_POSITION_X, BALL_START_POSITION_Y } from 'constants/position';
import { BALL_SPEED } from 'constants/size';
import { createSignal } from '@react-rxjs/utils';
import { moveX, moveY } from 'features/physics/utils';
import { Direction } from 'types/physics';
import { gameStart$ } from 'features/display/StartButton';

export const ballInterval$ = interval(Math.floor(1000 / BALL_SPEED)).pipe(skipUntil(gameStart$));

export const [ballDirectionX$, setBallDirectionX] = createSignal<Direction>();
export const [ballDirectionY$, setBallDirectionY] = createSignal<Direction>();
export const [hitTargetPosition$, setHitTargetPosition] = createSignal<[number, number]>();

export const ballPositionX$ = ballInterval$.pipe(
  withLatestFrom(ballDirectionX$.pipe(startWith<Direction>(1))),
  scan((currPosition, [, direction]) => moveX(currPosition, direction), BALL_START_POSITION_X),
);

export const ballPositionY$ = ballInterval$.pipe(
  withLatestFrom(ballDirectionY$.pipe(startWith<Direction>(1))),
  scan((currPosition, [, direction]) => moveY(currPosition, direction), BALL_START_POSITION_Y),
);

export const ballPosition$ = zip(ballPositionX$, ballPositionY$).pipe(
  startWith<[number, number]>([BALL_START_POSITION_X, BALL_START_POSITION_Y]),
);
