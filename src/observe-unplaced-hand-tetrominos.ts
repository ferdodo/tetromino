import { currentPuzzle$ } from "./current-puzzle";
import { getUnplacedHandTetromino } from "./get-unplaced-hand-tetrominos";
import { map, type Observable } from "rxjs";
import type { Tetromino } from "./types/tetromino";

export function observeUnplacedHandTetromino(): Observable<Tetromino[]> {
	return currentPuzzle$.pipe(map(() => getUnplacedHandTetromino()));
}
