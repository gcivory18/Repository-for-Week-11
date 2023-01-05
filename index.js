// declaring variables that will be needed
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// array of potential winning combinations
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// array of placeholders that will be filled with either X or O
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";

// keeps track if the game is running
let running = false;

// added event listeners for if a cell is clicked it will invoke the cellClicked function
// added another event listener so if the restart button is clicked it will invoke the restartGame function
// added status text to let us know whose turn it is
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn!`;
    running = true;
}

// check if the index number within the placeholders are not empty, only want to update a cell if there is nothing there
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}

// updating placeholders to whichever players turn it is so it fills with X or O
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// change from player to player starting with X and change to O
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn!`;
}

// iterate over the win conditions, each row has 3 indexes
// if the first 3 [0,1,2] are not blank and they are all the same we have a winner
// if there is no winner then the next set of win conditions are checked until there is a winner or draw
function checkWinner(){
    let roundWon = false;

    for(let i= 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        // if all the cells are occupied by the same X or O then there is a winner
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    // if 3 spaces have the same X or O then a winner is declared
    if(roundWon){
        statusText.textContent = `${currentPlayer} is the winner!`;
        running = false;
    }

    // if there are no spaces left and no winner then it is a draw
    else if(!options.includes("")){
        statusText.textContent = `Tie! Play again to determine a winner`;
        running = false;
    }
    // if there is no winner or draw then the game continues and we change to the next player
    else{
        changePlayer();
    }
}

// to play again the options need to be reset and the cells need to be cleared
function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn!`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

