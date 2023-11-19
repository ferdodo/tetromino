import { getCurrentPuzzle } from "./current-puzzle";
import { getTetromino } from "./get-tetromino";
import { PlacedTetromino } from "./placed-tetromino";
import { Block } from "blockwise";

export function getCandidateTetrominoBlocks(): Block[] | null {
    const puzzle = getCurrentPuzzle();

    if (puzzle.candidate === null) {
        return null;
    }

    const candidate: PlacedTetromino = puzzle.candidate;
    const tetromino = getTetromino(puzzle.candidate.id);

    return tetromino.blocks.map(function(block) {
        return {
            x: block.x + candidate.block.x,
            y: block.y + candidate.block.y,
            w: 1,
            h: 1
        }
    });
}