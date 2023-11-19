import { Block } from 'blockwise';
import { map, Observable, filter } from 'rxjs';
import { currentPuzzle$ } from './current-puzzle';
import { getPlacedTetrominoBlock } from './get-placed-tetromino-block';
import { PlacedTetromino } from './placed-tetromino';
import { Puzzle } from './puzzle';

export function observePlacedTetrominoBlock(id: number, blockIndex: number): Observable<Block> {
    return currentPuzzle$.pipe(
        filter(function(puzzle: Puzzle) {
            return puzzle.placed.some(function(placedTetromino: PlacedTetromino) {
                return placedTetromino.id === id;
            });
        }),
        map(() => getPlacedTetrominoBlock(id, blockIndex))
    );
}