import type { Block } from "blockwise";
import type { Tetromino } from "./tetromino";
import type { PlacedTetromino } from "./placed-tetromino";

export interface Puzzle {
	gameZone: Block;
	successZone: Block;
	handZone: Block;
	hand: Tetromino[];
	candidate: PlacedTetromino | null;
	placed: PlacedTetromino[];
}
