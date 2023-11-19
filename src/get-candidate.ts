import { getCurrentPuzzle } from "./current-puzzle";
import { PlacedTetromino } from "./placed-tetromino";

export function getCandidate(): PlacedTetromino | null {
    const puzzle = getCurrentPuzzle();
    return puzzle.candidate
}