import type { PlacedTetromino } from "./placed-tetromino";
import type { Tetromino } from "./tetromino";
import { getTetromino } from "./get-tetromino";
import { getPlacedTetromino } from "./get-placed-tetromino";
import type { Block } from "blockwise";

export function getPlacedTetrominoBlock(id: number, blockIndex: number): Block {
	const placedTetromino: PlacedTetromino = getPlacedTetromino(id);
	const tetromino: Tetromino = getTetromino(id);
	const block: Block = tetromino.blocks[blockIndex];

	return {
		x: block.x + placedTetromino.block.x,
		y: block.y + placedTetromino.block.y,
		w: 1,
		h: 1,
	};
}
