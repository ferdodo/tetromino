import { Puzzle } from './puzzle';
import { generatePuzzle } from './generate-puzzle';
import { Subject } from 'rxjs';
import { Block } from 'blockwise';
import { PlacedTetromino } from './placed-tetromino';

let puzzle = generatePuzzle();

const _currentPuzzle$ = new Subject<Puzzle>();
export const currentPuzzle$ = _currentPuzzle$.asObservable();

export function getCurrentPuzzle(): Puzzle {
    return puzzle;
}

export function setCandidate(id: number, position: Block) {
    puzzle = {
        ...puzzle,
        placed: puzzle.placed.filter(placed => placed.id !== id),
        candidate: {
            id,
            block: position
        }
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

    const candidate: PlacedTetromino = puzzle.candidate;

    puzzle = {
        ...puzzle,
        candidate: null,
        placed: [
            ...puzzle.placed.filter(placed => placed.id !== candidate.id),
            puzzle.candidate
        ]
    };

    console.log(`Place candidate ${candidate.id} at ${JSON.stringify(candidate.block)}`)

    _currentPuzzle$.next(puzzle);
}