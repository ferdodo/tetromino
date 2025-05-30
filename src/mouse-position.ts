import { Subject } from "rxjs";
import type { Block } from "blockwise";

let position: Block = { x: 0, y: 0, w: 0, h: 0 };
const _mousePosition = new Subject<Block>();
export const mousePosition$ = _mousePosition.asObservable();

export function getMousePosition(): Block {
	return position;
}

export function setMousePosition(p: Block) {
	position = p;
	_mousePosition.next(position);
}
