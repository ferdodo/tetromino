export function share() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}/${month}/${day}`;
    let text = `Tetromino ${formattedDate}`;

    text += `\n\nPuzzle réussi avec X positionements.`

    text += `\n\nhttps://ferdodo.github.io/tetromino`;
    navigator.clipboard.writeText(text);
}
