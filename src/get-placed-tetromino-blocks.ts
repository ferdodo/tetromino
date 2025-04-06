import { getCurrentPuzzle } from "./current-puzzle";
import type { Block } from "blockwise";
import type { Tetromino } from "./types/tetromino";
import type { PlacedTetromino } from "./types/placed-tetromino";

export function getPlacedTetrominoBlocks(): Block[] {
	const puzzle = getCurrentPuzzle();

	return puzzle.placed.flatMap((placed: PlacedTetromino) => {
		const tetromino = puzzle.hand.find((tetromino: Tetromino) => {
			return tetromino.id === placed.id;
		});

		if (!tetromino) {
			throw new Error("Tetromino not found !");
		}

		return tetromino.blocks.map((block: Block) => {
			return {
				x: block.x + placed.block.x,
				y: block.y + placed.block.y,
				w: block.w,
				h: block.h,
			};
		});
	});
}
