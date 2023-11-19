import { currentPuzzle$ } from "./current-puzzle";
import { getUnplacedHandTetromino } from "./get-unplaced-hand-tetrominos";
import { map, Observable } from "rxjs";
import { Tetromino } from "./tetromino";

export function observeUnplacedHandTetromino(): Observable<Tetromino[]> {
    return currentPuzzle$.pipe(
        map(() => getUnplacedHandTetromino())
    );
}