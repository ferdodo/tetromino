import { getCurrentPuzzle } from "./current-puzzle";

export function getColor(id: number): string {
	const puzzle = getCurrentPuzzle();

	const tetromino = puzzle.hand.find((t) => {
		return t.id === id;
	});

	if (!tetromino) {
		throw new Error("Tetromino not found !");
	}

	return tetromino.color;
}
