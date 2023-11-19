import { currentPuzzle$ } from "./current-puzzle";
import { map, Observable } from "rxjs";
import { PlacedTetromino } from "./placed-tetromino";
import { getPlacedTetromino } from "./get-placed-tetromino";

export function observePlacedTetromino(id: number): Observable<PlacedTetromino> {
    return currentPuzzle$.pipe(
        map(() => getPlacedTetromino(id))
    );
}