import type React from "react";
import { setMousePosition } from "../mouse-position";
import { emitMouseClick } from "../mouse-clicks";
import { emitMouseRightClick } from "../mouse-right-clicks";

interface MouseDetectionComponentProps {
	x: number;
	y: number;
}

export function MouseDetectionComponent({
	x,
	y,
}: MouseDetectionComponentProps) {
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

	const handleFocus = () => {
		handleHover();
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			handleClick();
		}
	};

	return (
		<div
			onClick={handleClick}
			onMouseOver={handleHover}
			onFocus={handleFocus}
			onKeyDown={handleKeyPress}
			onContextMenu={handleRightClick}
			style={{ gridArea: `${y}/${x}/${y + 1}/${x + 1}`, zIndex: 2 }}
		/>
	);
}
