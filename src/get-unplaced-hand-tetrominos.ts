import { getCurrentPuzzle } from "./current-puzzle";
import { Tetromino } from "./tetromino";

export function getUnplacedHandTetromino(): Tetromino[] {
    const puzzle = getCurrentPuzzle();

    return puzzle.hand.filter(function(t: Tetromino) {
        return !puzzle.placed.map(({ id }) => id).includes(t.id);
    });
}