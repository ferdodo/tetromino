import React from "react";
import { setMousePosition } from "./mouse-position";
import { emitMouseClick } from "./mouse-clicks";
import { emitMouseRightClick } from "./mouse-right-clicks";

interface MouseDetectionComponentProps {
	x: number;
	y: number;
}

export const MouseDetectionComponent: React.FC<
	MouseDetectionComponentProps
> = ({ x, y }) => {
	const handleClick = () => {
		emitMouseClick({
			x: x - 1,
			y: y - 1,
			w: 0,
			h: 0,
		});
	};

	const handleHover = () => {
		setMousePosition({
			x: x - 1,
			y: y - 1,
			w: 0,
			h: 0,
		});
	};

	const handleRightClick = (e: React.MouseEvent) => {
		e.preventDefault();
		emitMouseRightClick({
			x: x - 1,
			y: y - 1,
			w: 0,
			h: 0,
		});
	};

	return (
		<div
			onClick={handleClick}
			onMouseOver={handleHover}
			onContextMenu={handleRightClick}
			style={{ gridArea: `${y}/${x}/${y + 1}/${x + 1}`, zIndex: 2 }}
		/>
	);
};
