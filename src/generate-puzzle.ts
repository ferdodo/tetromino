import { generateId } from "./generate-id";
import type { PlacedTetromino } from "./placed-tetromino";
import type { Puzzle } from "./puzzle";
import { randomNumber } from "./random-number";
import type { Tetromino } from "./tetromino";
import { type Block, isBlockIncluding } from "blockwise";

export function generatePuzzle(): Puzzle {
	const format = randomNumber(0, 20);

	let width = 8;

	switch (format) {
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
			width = 6;
			break;
		case 20:
			width = 8;
	}

	let puzzle: Puzzle = {
		gameZone: {
			x: 0,
			y: 0,
			w: 12 + 3 + 15,
			h: 20,
		},
		successZone: {
			x: 0,
			y: 2,
			w: width,
			h: 6,
		},
		handZone: {
			x: width + 3,
			y: 0,
			w: 15,
			h: 20,
		},
		hand: [...Array((width * 6) / 4).keys()].map(generateTetromino),
		candidate: null,
		placed: [],
	};

	while (
		calculateSuccessZoneCoverage(puzzle) !==
		puzzle.successZone.w * puzzle.successZone.h
	) {
		const newPuzzle = randomPlacing(puzzle);
		const newCoverage = calculateSuccessZoneCoverage(newPuzzle);
		const oldCoverage = calculateSuccessZoneCoverage(puzzle);

		if (newCoverage >= oldCoverage) {
			puzzle = newPuzzle;
		}
	}

	return {
		...puzzle,
		placed: [],
	};
}

function randomPlacing(puzzle: Puzzle): Puzzle {
	const tetrominoIndex = randomNumber(0, puzzle.hand.length - 1);
	const tetrominoId = puzzle.hand[tetrominoIndex].id;

	let newPuzzle = {
		...puzzle,
		placed: puzzle.placed.filter((placed) => placed.id !== tetrominoId),
	};

	const tetromino = generateTetromino();

	newPuzzle = {
		...newPuzzle,
		hand: [...newPuzzle.hand.filter((t) => t.id !== tetrominoId), tetromino],
	};

	const newPlaced = randomPosition(newPuzzle);

	if (!isTetrominoWithinBounds(newPuzzle, tetromino, newPlaced)) {
		return puzzle;
	}

	newPuzzle = {
		...newPuzzle,
		placed: [
			...newPuzzle.placed,
			{
				id: tetromino.id,
				block: newPlaced,
			},
		],
	};

	return newPuzzle;
}

// how many blocks in the success zone are covered by placed tetrominos
function calculateSuccessZoneCoverage(puzzle: Puzzle): number {
	const placed: Block[] = puzzle.placed.flatMap((placed: PlacedTetromino) => {
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

	const uniquePositions = new Set(placed.map(({ x, y }) => `${x},${y}`));
	return uniquePositions.size;
}

function isTetrominoWithinBounds(
	puzzle: Puzzle,
	tetromino: Tetromino,
	placement: Block,
): boolean {
	return tetromino.blocks.every((block) => {
		return isBlockIncluding(puzzle.successZone, {
			x: block.x + placement.x,
			y: block.y + placement.y,
			w: block.w,
			h: block.h,
		});
	});
}

function randomPosition(puzzle: Puzzle): Block {
	const x = randomNumber(
		puzzle.successZone.x,
		puzzle.successZone.x + puzzle.successZone.w - 1,
	);
	const y = randomNumber(
		puzzle.successZone.y,
		puzzle.successZone.y + puzzle.successZone.h - 1,
	);
	return { x, y, w: 1, h: 1 };
}

function generateTetromino() {
	const random = randomNumber(0, 19);

	switch (random) {
		case 0:
			return generateIVertical();
		case 1:
			return generateIHorizontal();
		case 2:
			return generateO();
		case 3:
			return generateTDown();
		case 4:
			return generateTLeft();
		case 5:
			return generateTUp();
		case 6:
			return generateTRight();
		case 7:
			return generateLDown();
		case 8:
			return generateLLeft();
		case 9:
			return generateLUp();
		case 10:
			return generateLRight();
		case 11:
			return generateJDown();
		case 12:
			return generateJLeft();
		case 13:
			return generateJUp();
		case 14:
			return generateJRight();
		case 15:
			return generateSVertical();
		case 16:
			return generateSHorizontal();
		case 17:
			return generateZVertical();
		case 18:
			return generateZHorizontal();
		default:
			throw new Error("Invalid random number.");
	}
}

function generateIVertical(): Tetromino {
	return {
		id: generateId(),
		color: "cyan",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 0, y: 2, w: 1, h: 1 },
			{ x: 0, y: 3, w: 1, h: 1 },
		],
	};
}

function generateIHorizontal(): Tetromino {
	return {
		id: generateId(),
		color: "cyan",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 3, y: 0, w: 1, h: 1 },
		],
	};
}

function generateO(): Tetromino {
	return {
		id: generateId(),
		color: "yellow",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
		],
	};
}

function generateTDown(): Tetromino {
	return {
		id: generateId(),
		color: "purple",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
		],
	};
}

function generateTLeft(): Tetromino {
	return {
		id: generateId(),
		color: "purple",
		blocks: [
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 2, y: 1, w: 1, h: 1 },
		],
	};
}

function generateTUp(): Tetromino {
	return {
		id: generateId(),
		color: "purple",
		blocks: [
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 1, y: 2, w: 1, h: 1 },
		],
	};
}

function generateTRight(): Tetromino {
	return {
		id: generateId(),
		color: "purple",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
		],
	};
}

function generateLDown(): Tetromino {
	return {
		id: generateId(),
		color: "orange",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 0, y: 2, w: 1, h: 1 },
			{ x: 1, y: 2, w: 1, h: 1 },
		],
	};
}

function generateLLeft(): Tetromino {
	return {
		id: generateId(),
		color: "orange",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
		],
	};
}

function generateLUp(): Tetromino {
	return {
		id: generateId(),
		color: "orange",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 1, y: 2, w: 1, h: 1 },
		],
	};
}

function generateLRight(): Tetromino {
	return {
		id: generateId(),
		color: "orange",
		blocks: [
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 2, y: 1, w: 1, h: 1 },
		],
	};
}

function generateJDown(): Tetromino {
	return {
		id: generateId(),
		color: "blue",
		blocks: [
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 0, y: 2, w: 1, h: 1 },
			{ x: 1, y: 2, w: 1, h: 1 },
		],
	};
}

function generateJLeft(): Tetromino {
	return {
		id: generateId(),
		color: "blue",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 2, y: 1, w: 1, h: 1 },
		],
	};
}

function generateJUp(): Tetromino {
	return {
		id: generateId(),
		color: "blue",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 0, y: 2, w: 1, h: 1 },
		],
	};
}

function generateJRight(): Tetromino {
	return {
		id: generateId(),
		color: "blue",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 2, y: 1, w: 1, h: 1 },
		],
	};
}

function generateSVertical(): Tetromino {
	return {
		id: generateId(),
		color: "green",
		blocks: [
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 2, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
		],
	};
}

function generateSHorizontal(): Tetromino {
	return {
		id: generateId(),
		color: "green",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 1, y: 2, w: 1, h: 1 },
		],
	};
}

function generateZVertical(): Tetromino {
	return {
		id: generateId(),
		color: "red",
		blocks: [
			{ x: 0, y: 0, w: 1, h: 1 },
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 2, y: 1, w: 1, h: 1 },
		],
	};
}

function generateZHorizontal(): Tetromino {
	return {
		id: generateId(),
		color: "red",
		blocks: [
			{ x: 1, y: 0, w: 1, h: 1 },
			{ x: 0, y: 1, w: 1, h: 1 },
			{ x: 1, y: 1, w: 1, h: 1 },
			{ x: 0, y: 2, w: 1, h: 1 },
		],
	};
}
