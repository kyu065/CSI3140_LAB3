function createGame(n) {
    // Create an array of length n 
    let board = Array(n).fill('.');

    // Get random positions for C, @, and ^
    let positions = new Set();
    while (positions.size < 3) {
        positions.add(Math.floor(Math.random() * n));
    }
    positions = Array.from(positions);

    // Assign PacMan, fruit, and ghost to the board
    board[positions[0]] = 'C';
    board[positions[1]] = '@';
    board[positions[2]] = '^';

    return board;
}

//create game
console.log(createGame(10));