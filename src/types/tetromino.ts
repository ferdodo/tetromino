import type { Block } from "blockwise";

export interface Tetromino {
	id: number;
	color: string;
	blocks: Block[];
}
