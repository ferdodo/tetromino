import { getCurrentPuzzle } from "./current-puzzle";
import { Block } from "blockwise";
import { Tetromino } from "./tetromino";
import { PlacedTetromino } from "./placed-tetromino";

export function getPlacedTetrominoBlocks(): Block[] {
    const puzzle = getCurrentPuzzle();

    return puzzle.placed
        .map(function(placed: PlacedTetromino) {
            const tetromino = puzzle.hand.find(function(tetromino: Tetromino) {
                return tetromino.id === placed.id;
            });

            if (!tetromino) {
                throw new Error("Tetromino not found !");
            }

            return tetromino.blocks.map(function(block: Block) {
                return {
                    x: block.x + placed.block.x,
                    y: block.y + placed.block.y,
                    w: block.w,
                    h: block.h
                };
            });
        }).flat();
}