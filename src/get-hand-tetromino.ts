import { getCurrentPuzzle } from "./current-puzzle";
import { Tetromino } from "./tetromino";

export function getHandTetromino(id: number): Tetromino {
    const puzzle = getCurrentPuzzle();
    const tetromino = puzzle.hand.find(t => t.id === id);

    if (!tetromino) {
        throw new Error(`Tetromino with id ${id} not found !`);
    }

    return tetromino;
}