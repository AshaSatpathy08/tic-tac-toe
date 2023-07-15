const boxes = document.querySelectorAll(".box"); // Select all elements with the class "box" and store them in the `boxes` variable
const gameInfo = document.querySelector(".game-info"); // Select the element with the class "game-info" and store it in the `gameInfo` variable
const newGameBtn = document.querySelector(".btn"); // Select the element with the class "btn" and store it in the `newGameBtn` variable

let currentPlayer; // Variable to keep track of the current player
let gameGrid; // Variable to store the state of the game grid

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]; // Array of winning combinations

function initGame() {
  currentPlayer = "X"; // Set the current player to "X"
  gameGrid = ["", "", "", "", "", "", "", "", ""]; // Initialize the game grid as an empty array

  boxes.forEach((box, index) => {
    box.innerText = ""; // Clear the text content of each box
    boxes[index].style.pointerEvents = "all"; // Enable pointer events for each box
    box.classList = `box box${index + 1}`; // Reset the CSS classes of each box
  });

  newGameBtn.classList.remove("active"); // Remove the "active" class from the new game button
  gameInfo.innerText = `Current Player - ${currentPlayer}`; // Update the game info text to display the current player
}

initGame(); // Call the `initGame` function to initialize the game when the script is first executed

function swapTurn() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"; // Swap the current player between "X" and "O"
  gameInfo.innerText = `Current Player - ${currentPlayer}`; // Update the game info text to reflect the current player
}

function checkGameOver() {
  let answer = ""; // Variable to store the winning player ("X" or "O")

  winningPositions.forEach((position) => {
    // Check each winning position
    if (
      gameGrid[position[0]] !== "" &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // If all three positions have the same non-empty value, we have a winner
      answer = gameGrid[position[0]]; // Set the winning player
      boxes.forEach((box) => {
        box.style.pointerEvents = "none"; // Disable pointer events on the boxes
      });
      boxes[position[0]].classList.add("win"); // Add the "win" class to the winning boxes for visual styling
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    // If we have a winner
    gameInfo.innerText = `Winner Player - ${answer}`; // Update the game info text to display the winning player
    newGameBtn.classList.add("active"); // Add the "active" class to the new game button
    return;
  }

  let fillCount = 0; // Variable to count the number of filled boxes

  gameGrid.forEach((box) => {
    if (box !== "") fillCount++; // Increment the fill count for each non-empty box
  });

  if (fillCount === 9) {
    // If the fill count is 9, all boxes are filled and there is no winner
    gameInfo.innerText = "Game Tied !"; // Update the game info text to display a tie
    newGameBtn.classList.add("active"); // Add the "active" class to the new game button
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    // If the clicked box is empty
    boxes[index].innerText = currentPlayer; // Set the text content of the box to the current player
    gameGrid[index] = currentPlayer; // Update the game grid with the current player's symbol
    boxes[index].style.pointerEvents = "none"; // Disable further clicks on the box
    swapTurn(); // Swap the turn to the other player
    checkGameOver(); // Check if there is a winner or tie
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index); // Add a click event listener to each box and call the `handleClick` function with the box index as a parameter
  });
});

newGameBtn.addEventListener("click", initGame); // Add a click event listener to the new game button and call the `initGame` function when clicked
