let playBoard = document.querySelector(".game");
const timerElement=document.querySelector(".timer");
var foodSound = new Audio('food.mp3');
var gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('moving.mp3');
let foodX, foodY;
let snakeX = 12, snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let score = 1;
let seconds=60;
let timeInterval;
let b;
musicSound.play();
let highscore = localStorage.getItem("High-Score") || 0;
document.getElementById('highscore').innerHTML = `High-Score: ${highscore}`;

const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 20) + 1;
    foodY = Math.floor(Math.random() * 20) + 1;
}
const Time=()=>{
    if(snakeX!=foodX && snakeY!=foodY)
     {
      seconds--;
     }
     if(seconds<0)
     {
      gameOver();
     }
     timerElement.innerText=`Time-Left: ${seconds}`;
  }
const gameOver = () => {
    gameOverSound.play();
    musicSound.pause();
    clearInterval(b);
    clearInterval(timeInterval)
    alert("Game over!! Click ok for new game");
    location.reload();
}

const initGame = () => {
    let a = `<div class="food" style="grid-area: ${foodX}/${foodY}"></div>`
    snakeX += velocityX;
    snakeY += velocityY;
    a += `<div class="head" style="grid-area: ${snakeX}/${snakeY}"></div>`
    if (snakeX == foodX && snakeY == foodY) {
        foodSound.play()
        snakeBody.push([foodX, foodY]);

        updateFoodPosition();
        score++;
        seconds+=5;
        if (highscore <= score) {
            highscore = score;
        }
        else highscore = highscore;
        localStorage.setItem("High-Score", highscore)
        document.getElementById('score').innerHTML = `Score: ${score}`;
        document.getElementById('highscore').innerHTML = `High-Score: ${highscore}`;
    }

    if (snakeX >= 21 || snakeX <= 0 || snakeY >= 21 || snakeY <= 0) {
        gameOver();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeY, snakeX]

    for (let i = 0; i < snakeBody.length; i++) {
        a += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver();
        }
    }
    playBoard.innerHTML = a;

}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityX != 1) {
        moveSound.play();
        velocityX = -1;
        velocityY = 0;
    }
    if (e.key === "ArrowDown" && velocityX != -1) {
        moveSound.play();
        velocityX = 1;
        velocityY = 0;
    }
    if (e.key === "ArrowLeft" && velocityY != 1) {
        moveSound.play();
        velocityX = 0;
        velocityY = -1;
    }
    if (e.key === "ArrowRight" && velocityY != -1) {
        moveSound.play();
        velocityX = 0;
        velocityY = 1;
    }
}
const down = () => {
    if (velocityX != -1) {
        moveSound.play();
        velocityX = 1;
        velocityY = 0;
    }
}
const up = () => {
    if (velocityX != 1) {
        moveSound.play();
        velocityX = -1;
        velocityY = 0;
    }
}
const left = () => {
    if (velocityY != 1) {
        moveSound.play();
        velocityX = 0;
        velocityY = -1;
    }
}
const right = () => {
    if (velocityY != 1) {
        moveSound.play();
        velocityX = 0;
        velocityY = 1;
    }
}
if (snakeX == foodX && snakeY == foodY)
    score++;
b=setInterval(initGame, 150);
timeInterval=setInterval(Time,1000);
updateFoodPosition();
document.addEventListener("keydown", Time);
document.addEventListener("keydown", changeDirection);