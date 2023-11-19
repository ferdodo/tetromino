import { Block } from 'blockwise';
import { map, Observable } from 'rxjs';
import { currentPuzzle$ } from './current-puzzle';
import { getPlacedTetrominoBlock } from './get-placed-tetromino-block';

export function observePlacedTetrominoBlock(id: number, blockIndex: number): Observable<Block> {
    return currentPuzzle$.pipe(
        map(() => getPlacedTetrominoBlock(id, blockIndex))
    );
}