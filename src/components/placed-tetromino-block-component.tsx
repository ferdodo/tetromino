import { useState, useEffect } from "react";
import type { Block } from "blockwise";
import { getPlacedTetrominoBlock } from "../get-placed-tetromino-block";
import { observePlacedTetrominoBlock } from "../observe-placed-tetromino-block";
import { TetrominoBlockComponent } from "./tetromino-block-component";

interface PlacedTetrominoBlockComponentProps {
	id: number;
	blockIndex: number;
}

export function PlacedTetrominoBlockComponent({
	id,
	blockIndex,
}: PlacedTetrominoBlockComponentProps) {
	const [placedTetrominoBlock, setPlacedTetrominoBlock] = useState<Block>(
		getPlacedTetrominoBlock(id, blockIndex),
	);

	useEffect(() => {
		const subscription = observePlacedTetrominoBlock(id, blockIndex).subscribe(
			(value: Block) => setPlacedTetrominoBlock(value),
		);

		return () => subscription.unsubscribe();
	}, [id, blockIndex]);

	return (
		<div
			className="placed-tetromino"
			style={{
				gridArea: `${placedTetrominoBlock.y + 1}/${placedTetrominoBlock.x + 1}/${placedTetrominoBlock.y + 2}/${placedTetrominoBlock.x + 2}`,
			}}
		>
			<TetrominoBlockComponent id={id} />
		</div>
	);
}
