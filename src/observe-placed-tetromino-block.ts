import type { Block } from "blockwise";
import { map, type Observable, filter } from "rxjs";
import { currentPuzzle$ } from "./current-puzzle";
import { getPlacedTetrominoBlock } from "./get-placed-tetromino-block";
import type { PlacedTetromino } from "./types/placed-tetromino";
import type { Puzzle } from "./types/puzzle";

export function observePlacedTetrominoBlock(
	id: number,
	blockIndex: number,
): Observable<Block> {
	return currentPuzzle$.pipe(
		filter((puzzle: Puzzle) => {
			return puzzle.placed.some((placedTetromino: PlacedTetromino) => {
				return placedTetromino.id === id;
			});
		}),
		map(() => getPlacedTetrominoBlock(id, blockIndex)),
	);
}
