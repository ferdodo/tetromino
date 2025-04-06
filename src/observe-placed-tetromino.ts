import { currentPuzzle$ } from "./current-puzzle";
import { map, type Observable } from "rxjs";
import type { PlacedTetromino } from "./types/placed-tetromino";
import { getPlacedTetromino } from "./get-placed-tetromino";

export function observePlacedTetromino(
	id: number,
): Observable<PlacedTetromino> {
	return currentPuzzle$.pipe(map(() => getPlacedTetromino(id)));
}
