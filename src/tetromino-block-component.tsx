import React from "react";
import { getColor } from "./get-color";

interface TetrominoBlockProps {
	id: number;
	moving?: boolean;
}

export const TetrominoBlockComponent: React.FC<TetrominoBlockProps> = ({
	id,
	moving = false,
}) => {
	const color = getColor(id);

	return (
		<div
			className={`tetromino-block ${moving ? "moving" : ""}`}
			style={{ backgroundColor: color }}
		/>
	);
};
