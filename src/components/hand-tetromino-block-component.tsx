import type React from "react";
import { useState } from "react";
import type { Block } from "blockwise";
import { getHandTetrominoBlock } from "../get-hand-tetromino-block";
import { TetrominoBlockComponent } from "./tetromino-block-component";

interface HandTetrominoBlockComponentProps {
	id: number;
	handIndex: number;
	blockIndex: number;
}

export const HandTetrominoBlockComponent: React.FC<
	HandTetrominoBlockComponentProps
> = ({ id, handIndex, blockIndex }) => {
	const [handTetrominoBlock] = useState<Block>(
		getHandTetrominoBlock(id, handIndex, blockIndex),
	);

	return (
		<div
			className="hand-tetromino"
			style={{
				gridArea: `${handTetrominoBlock.y + 1}/${handTetrominoBlock.x + 1}/${handTetrominoBlock.y + 2}/${handTetrominoBlock.x + 2}`,
			}}
		>
			<TetrominoBlockComponent id={id} />
		</div>
	);
};
