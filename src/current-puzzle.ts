import type { Puzzle } from "./puzzle";
import { generatePuzzle } from "./generate-puzzle";
import { Subject } from "rxjs";
import type { Block } from "blockwise";
import type { PlacedTetromino } from "./placed-tetromino";
import { isPlacementLegal } from "./is-placement-legal";

let puzzle = generatePuzzle();

const _currentPuzzle$ = new Subject<Puzzle>();
export const currentPuzzle$ = _currentPuzzle$.asObservable();

let moveCount = 0;

export function getMoveCount(): number {
	return moveCount;
}

export function getCurrentPuzzle(): Puzzle {
	return puzzle;
}

export function setCandidate(id: number, position: Block) {
	puzzle = {
		...puzzle,
		placed: puzzle.placed.filter((placed) => placed.id !== id),
		candidate: {
			id,
			block: position,
		},
	};

	_currentPuzzle$.next(puzzle);
}

export function clearCandidate() {
	puzzle = { ...puzzle, candidate: null };
	_currentPuzzle$.next(puzzle);
}

export function placeCandidate() {
	if (puzzle.candidate === null) {
		return;
	}

	if (!isPlacementLegal()) {
		puzzle = { ...puzzle, candidate: null };
		_currentPuzzle$.next(puzzle);
		return;
	}

	const candidate: PlacedTetromino = puzzle.candidate;

	puzzle = {
		...puzzle,
		candidate: null,
		placed: [
			...puzzle.placed.filter((placed) => placed.id !== candidate.id),
			puzzle.candidate,
		],
	};

	_currentPuzzle$.next(puzzle);

	moveCount++;
}

export function clearPlaced(id: number) {
	puzzle = {
		...puzzle,
		placed: puzzle.placed.filter((placed) => placed.id !== id),
	};

	_currentPuzzle$.next(puzzle);
}
