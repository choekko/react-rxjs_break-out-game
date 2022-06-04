import { gameStart$ } from 'features/display/StartButton';
import { filter, map, merge, of, scan, startWith, switchMap } from 'rxjs';
import { hitTargetPosition$ } from 'features/physics/streams/ballStream';
import { makeIndexArray, shuffleArray } from 'utils/array';
import { DISPLAY_SIZE } from 'constants/size';

const BLOCK_AREA_HEIGHT = 10;
const BLOCK_NUMBER = 100;

const BLOCK_COORDINATE_X_POSSIBLE = makeIndexArray(DISPLAY_SIZE.WIDTH);
const BLOCK_COORDINATE_Y_POSSIBLE = Array.from({ length: BLOCK_AREA_HEIGHT }, (_, i) => DISPLAY_SIZE.HEIGHT - 1 - i);

const makeBlockPositionCandidates = (): [number, number][] =>
  BLOCK_COORDINATE_X_POSSIBLE.flatMap(x =>
    BLOCK_COORDINATE_Y_POSSIBLE.reduce<[number, number][]>((acc, y) => [...acc, [x, y]], []),
  );

export const blockPositions$ = gameStart$.pipe(
  filter(isStarted => isStarted === true),
  map(() => shuffleArray<[number, number]>(makeBlockPositionCandidates()).slice(0, BLOCK_NUMBER)),
  switchMap(initialBlockPositions =>
    merge(
      of(initialBlockPositions),
      hitTargetPosition$.pipe(
        scan(
          (blockPositions, [x, y]) => blockPositions.filter(([blockX, blockY]) => x !== blockX || y !== blockY),
          initialBlockPositions,
        ),
      ),
    ),
  ),
  startWith([]),
);
