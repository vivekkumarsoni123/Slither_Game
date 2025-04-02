// constants required for the game
const speed = 9;
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio("eating.mp3");
const gameover = new Audio("collision.mp3");
const moveSound = new Audio("movement.mp3");
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0, highscore = 0;

// Select the playarea element
const playarea = document.getElementById("playarea");

// Select score and highscore elements
const scorebox = document.getElementById("scorebox");
const hscorebox = document.getElementById("hscorebox");

// functions required for the game ::------------------------------------------
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// function to collision detection

function isCollide(snake) {
    // If snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            highscore = Math.max(highscore, score); // Update highscore if needed
            localStorage.setItem("highscore", JSON.stringify(highscore)); // Save highscore
            hscorebox.innerHTML = "Highscore: " + highscore; // Update highscore display
            return true;
        }
    }
    // If snake collides with the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        highscore = Math.max(highscore, score); // Update highscore if needed
        localStorage.setItem("highscore", JSON.stringify(highscore)); // Save highscore
        hscorebox.innerHTML = "Highscore: " + highscore; // Update highscore display
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        gameover.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press (Ctrl + R) to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0; // Reset score
        scorebox.innerHTML = "Score: " + score; // Update score display
        return;
    }

    // Part 1: Update the snake array and food position after eating food
    moveSound.play();

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        let a = 2, b = 16;
        foodsound.play();
        score += 1; // Increment score
        scorebox.innerHTML = "Score: " + score; // Update score display
        if (score > highscore) {
            highscore = score; // Update highscore
            localStorage.setItem("highscore", JSON.stringify(highscore)); // Save highscore
            hscorebox.innerHTML = "Highscore: " + highscore; // Update highscore display
        }
        // Generate new food position
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // Move the snake
    for (let i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i] = { ...snakeArr[i - 1] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: logic to display Snake on the board
    playarea.innerHTML = ""; // Clear the playarea
    snakeArr.forEach((e, index) => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        playarea.appendChild(snakeElement);
    });

    // Display Food
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    playarea.appendChild(foodElement);
}

// logic to create the game board and start the game::--------------------------

highscore = localStorage.getItem("highscore");
// highscore = JSON.parse(highscore);
if (highscore === null) {
    highscore = 0;
    localStorage.setItem("highscore", JSON.stringify(highscore)); // stringify funtion: It is commonly used to store data in a format that can be easily saved or transmitted
} else {
    highscore = JSON.parse(highscore);
    hscorebox.innerHTML = "Highscore: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp": // Fixed case
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown": // Fixed case
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft": // Fixed case
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight": // Fixed case
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});






