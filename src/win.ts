import { type Observable, map } from "rxjs";
import { currentPuzzle$ } from "./current-puzzle";
import type { Puzzle } from "./types/puzzle";

export const win$: Observable<boolean> = currentPuzzle$.pipe(
	map((puzzle: Puzzle) => puzzle.placed.length === puzzle.hand.length),
);
