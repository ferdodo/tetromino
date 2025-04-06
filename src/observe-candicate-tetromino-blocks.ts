import { currentPuzzle$ } from "./current-puzzle";
import { getCandidateTetrominoBlocks } from "./get-candidate-tetromino-blocks";
import { map, type Observable } from "rxjs";
import type { Block } from "blockwise";

export function observeCandidateTetrominoBlocks(): Observable<Block[] | null> {
	return currentPuzzle$.pipe(map(() => getCandidateTetrominoBlocks()));
}
