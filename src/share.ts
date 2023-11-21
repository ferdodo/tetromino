import { getMoveCount, getCurrentPuzzle } from "./current-puzzle";

export function share() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    let text = `Tetromino ${formattedDate}`;

    text += `\n\nPuzzle réussi (${ getPuzzleSize() } pièces) avec ${ getMoveCount() } positionnements.`;

    text += `\n\nhttps://ferdodo.github.io/tetromino`;
    navigator.clipboard.writeText(text);
}


function getPuzzleSize(): number {
	const puzzle = getCurrentPuzzle();

	switch(puzzle.successZone.w) {
		case 4:
			return 6;
		case 6:
			return 9;
		case 8:
			return 12;
		default:
			throw new Error("Unexpected successZone width !");
	}
}
