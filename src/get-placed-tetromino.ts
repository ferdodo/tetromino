import type { PlacedTetromino } from "./types/placed-tetromino";
import { getCurrentPuzzle } from "./current-puzzle";

export function getPlacedTetromino(id: number): PlacedTetromino {
	const puzzle = getCurrentPuzzle();
	const placedTetromino = puzzle.placed.find((t) => t.id === id);

	if (!placedTetromino) {
		throw new Error(`PlacedTetromino with id ${id} not found !`);
	}

	return placedTetromino;
}
