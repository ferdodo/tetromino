import { currentPuzzle$ } from "./current-puzzle";
import { getCandidateTetrominoBlocks } from "./get-candidate-tetromino-blocks";
import { map, Observable } from "rxjs";
import { Block } from "blockwise";

export function observeCandidateTetrominoBlocks(): Observable<Block[] | null> {
    return currentPuzzle$.pipe(
        map(() => getCandidateTetrominoBlocks())
    );
}