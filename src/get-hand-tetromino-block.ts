import { getCurrentPuzzle } from "./current-puzzle";
import type { Puzzle } from "./puzzle";
import type { Tetromino } from "./tetromino";
import type { Block } from "blockwise";

export function getHandTetrominoBlock(
	id: number,
	handIndex: number,
	blockIndex: number,
): Block {
	const puzzle: Puzzle = getCurrentPuzzle();
	const tetromino: Tetromino | undefined = puzzle.hand.find((t) => t.id === id);

	if (!tetromino) {
		throw new Error(`Tetromino with id ${id} not found !`);
	}

	const block: Block = tetromino.blocks[blockIndex];

	return {
		x: block.x + ((handIndex * 5) % 15) + puzzle.handZone.x,
		y: block.y + Math.floor(handIndex / 3) * 5 + puzzle.handZone.y,
		h: 1,
		w: 1,
	};
}
