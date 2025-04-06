import { currentPuzzle$ } from "./current-puzzle";
import { getCandidate } from "./get-candidate";
import { map, type Observable } from "rxjs";
import type { PlacedTetromino } from "./placed-tetromino";

export function observeCandidate(): Observable<PlacedTetromino | null> {
	return currentPuzzle$.pipe(map(() => getCandidate()));
}
