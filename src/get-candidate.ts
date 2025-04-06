import { getCurrentPuzzle } from "./current-puzzle";
import type { PlacedTetromino } from "./types/placed-tetromino";

export function getCandidate(): PlacedTetromino | null {
	const puzzle = getCurrentPuzzle();
	return puzzle.candidate;
}
