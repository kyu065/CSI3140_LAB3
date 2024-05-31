// Function to create the game board
function createGame(n) {
    // Create an array of length n filled with pellets
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

// Game class to manage the game state
class Game {
    constructor(board) {
        this.board = board;
        this.pacmanIndex = board.indexOf('C');
        this.ghostIndex = board.indexOf('^');
        this.score = 0;
        this.pacmanMoveCount = 0; // Counter
    }

    moveLeft() {
        if (this.pacmanIndex > 0) {
            if (this.board[this.pacmanIndex - 1] === '.') {
                this.score += 10; 
            }
            this.board[this.pacmanIndex] = '.';
            this.pacmanIndex -= 1;
            this.board[this.pacmanIndex] = 'C';
            this.pacmanMoveCount += 1;
            if (this.pacmanMoveCount % 2 === 0) {
                this.moveGhost();
            }
        }
        return this.board;
    }

    moveRight() {
        if (this.pacmanIndex < this.board.length - 1) {
            if (this.board[this.pacmanIndex + 1] === '.') {
                this.score += 10; // Increment score for eating a pellet
            }
            this.board[this.pacmanIndex] = '.';
            this.pacmanIndex += 1;
            this.board[this.pacmanIndex] = 'C';
            this.pacmanMoveCount += 1;
            if (this.pacmanMoveCount % 2 === 0) {
                this.moveGhost();
            }
        }
        return this.board;
    }

    moveGhost() {
        const directions = [-1, 1];
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        const newGhostIndex = this.ghostIndex + randomDirection;

        if (newGhostIndex >= 0 && newGhostIndex < this.board.length) {
            if (this.board[newGhostIndex] === '.') {
                this.board[this.ghostIndex] = '.';
                this.ghostIndex = newGhostIndex;
                this.board[this.ghostIndex] = '^';
            }
        }
    }

    checkLevelCompletion() {
        return this.board.every(cell => cell !== '.');
    }

    resetBoard() {
        // Reset the board while keeping PacMan and the ghost in place
        this.board.fill('.');
        this.board[this.pacmanIndex] = 'C';
        this.board[this.ghostIndex] = '^';
        // Add a fruit at a random position
        let fruitIndex;
        do {
            fruitIndex = Math.floor(Math.random() * this.board.length);
        } while (fruitIndex === this.pacmanIndex || fruitIndex === this.ghostIndex);
        this.board[fruitIndex] = '@';
    }
}

// Example usage:
let gameBoard = createGame(10);
let game = new Game(gameBoard);
console.log(game.board); // Initial game state

// Simulate PacMan movements and check level completion
console.log(game.moveLeft()); 
console.log(game.moveRight()); 
console.log(game.score); 

// Check level completion
if (game.checkLevelCompletion()) {
    console.log("Level completed!");
    game.resetBoard();
    console.log(game.board); // New game
}
