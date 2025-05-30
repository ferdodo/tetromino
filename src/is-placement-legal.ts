import { type Block, isBlockColliding, isBlockIncluding } from "blockwise";
import { getPlacedTetrominoBlocks } from "./get-placed-tetromino-blocks";
import { getCurrentPuzzle } from "./current-puzzle";
import type { Puzzle } from "./types/puzzle";
import { getCandidateTetrominoBlocks } from "./get-candidate-tetromino-blocks";

export function isPlacementLegal(): boolean {
	const blocks: Block[] | null = getCandidateTetrominoBlocks();

	if (blocks === null) {
		return false;
	}

	const placedTetrominoBlocks = getPlacedTetrominoBlocks();
	const puzzle: Puzzle = getCurrentPuzzle();

	return (
		!isCollidingPlacedBlock(placedTetrominoBlocks, blocks) &&
		isIncludedInSuccessZone(puzzle, blocks)
	);
}

function isCollidingPlacedBlock(
	placedTetrominoBlocks: Block[],
	blocks: Block[],
): boolean {
	return placedTetrominoBlocks.some((tetrominoBlock) => {
		return blocks.some((block) => {
			return isBlockColliding(block, tetrominoBlock);
		});
	});
}

function isIncludedInSuccessZone(puzzle: Puzzle, blocks: Block[]): boolean {
	const value = blocks.every((block) => {
		return isBlockIncluding(puzzle.successZone, block);
	});

	return value;
}
