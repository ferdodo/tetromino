import { currentPuzzle$ } from "./current-puzzle";
import { getCandidate } from "./get-candidate";
import { map, Observable } from "rxjs";
import { PlacedTetromino } from "./placed-tetromino";

export function observeCandidate(): Observable<PlacedTetromino | null> {
    return currentPuzzle$.pipe(
        map(() => getCandidate())
    );
}