import { animate, stopAnimation } from "../engine/animation.mjs";
import { down, onKeydown } from "../engine/input.mjs";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const boyImg = document.querySelector('#boy');
const gameOverImg = document.querySelector('#gameOver');
const scoreText = document.querySelector('#score-text');
const restartMessage = document.querySelector('#restart-message');

const RADIUS = 20;
const INITIAL_GRAVITY = 1300;
const INITIAL_JUMP_SPEED = -600;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 60;
const INITIAL_OBSTACLE_SPEED = 250;
const MIN_OBSTACLE_DISTANCE = 200;

let gravity;
let jumpSpeed;
let obstacleSpeed;

let x;
let y;
let velocityY;
let obstacles;
let gameOver;
let score;

function initializeGame() {
    gravity = INITIAL_GRAVITY;
    jumpSpeed = INITIAL_JUMP_SPEED;
    obstacleSpeed = INITIAL_OBSTACLE_SPEED;
    
    x = 100;
    y = canvas.height - RADIUS - 50;
    velocityY = 0;
    obstacles = [];
    gameOver = false;
    score = 0;

    gameOverImg.style.display = 'none';
    restartMessage.style.display = 'none';

    onKeydown('Enter', handleRestart);
    animate(canvas, { update, draw });
}

function generateObstacle() {
    if (obstacles.length === 0 || (canvas.width - obstacles[obstacles.length - 1].x) >= MIN_OBSTACLE_DISTANCE) {
        const obstacle = {
            x: canvas.width,
            y: canvas.height - OBSTACLE_HEIGHT,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT,
            element: createObstacleElement()
        };
        obstacles.push(obstacle);
    }
}

function createObstacleElement() {
    const bugImg = document.createElement('img');
    bugImg.src = 'images/bug.gif';
    bugImg.classList.add('bug', 'animated-gif');
    bugImg.style.position = 'absolute';
    bugImg.style.bottom = '0px';
    bugImg.style.left = `${canvas.width}px`;
    document.querySelector('.game-container').appendChild(bugImg);
    return bugImg;
}

function resetGame() {
    stopAnimation();
    obstacles.forEach(obstacle => obstacle.element.remove());
    initializeGame();
}

function update(time) {
    var jumpSound = document.getElementById("jumpSound");
    var gameOverSound = document.getElementById("gameOverSound");

    if (gameOver) return;

    if (down('ArrowUp') && y >= canvas.height - RADIUS) {
        velocityY = jumpSpeed;
    }

    velocityY += gravity * time;
    y += velocityY * time;

    if (y + RADIUS >= canvas.height) {
        y = canvas.height - RADIUS;
        velocityY = 0;
    }

    obstacles.forEach(obstacle => {
        if (
            x < obstacle.x + obstacle.width &&
            x + RADIUS > obstacle.x &&
            y < obstacle.y + obstacle.height &&
            y + RADIUS > obstacle.y
        ) {
            gameOver = true;
            gameOverSound.play();
            stopAnimation();
            gameOverImg.style.display = 'block';
            gameOverImg.style.left = `${canvas.width / 2 - 200}px`;
            gameOverImg.style.top = `${canvas.height / 2 - 100}px`;
            restartMessage.style.display = 'block';
        }
    });

    obstacles = obstacles.filter(obstacle => {
        obstacle.x -= obstacleSpeed * time;
        if (obstacle.x + OBSTACLE_WIDTH < 0) {
            obstacle.element.remove();
            jumpSound.play();
            score++;
            return false;
        } else {
            obstacle.element.style.left = `${obstacle.x}px`;
            return true;
        }
    });

    if (Math.random() < 0.02) {
        generateObstacle();
    }
}

function handleRestart(event) {
    if (gameOver) {
        document.removeEventListener('keydown', handleRestart);
        resetGame();
    }
}

function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boyImg.style.left = `${x - RADIUS}px`;
    boyImg.style.bottom = `${canvas.height - y - RADIUS - 18}px`;

    scoreText.textContent = score;

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        gameOverImg.style.display = 'block';
        gameOverImg.style.left = `${canvas.width / 2 - 200}px`;
        gameOverImg.style.top = `${canvas.height / 2 - 100}px`;
    }
}

initializeGame();