import { animate } from "../engine/animation.mjs";
import { down } from "../engine/input.mjs";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const boyImg = document.querySelector('#boy');
const gameOverImg = document.querySelector('#gameOver');

const RADIUS = 20;
const GRAVITY = 1300;
const JUMP_SPEED = -600;

let x = 100;
let y = canvas.height - RADIUS;
let velocityY = 0;
let obstacles = [];
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 60;
const OBSTACLE_SPEED = 250;
const MIN_OBSTACLE_DISTANCE = 200;

let gameOver = false;
let score = 0;

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
    bugImg.src = 'bug.png';
    bugImg.classList.add('bug', 'animated-gif');
    bugImg.style.bottom = '0px';
    document.querySelector('.game-container').appendChild(bugImg);
    return bugImg;
}

function update(time) {
    if (gameOver) return;

    if (down('ArrowUp') && y >= canvas.height - RADIUS) {
        velocityY = JUMP_SPEED;
    }

    velocityY += GRAVITY * time;
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
        }
    });

    obstacles = obstacles.filter(obstacle => {
        obstacle.x -= OBSTACLE_SPEED * time;
        if (obstacle.x + OBSTACLE_WIDTH < 0) {
            obstacle.element.remove();
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

function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boyImg.style.left = `${x - RADIUS}px`;
    boyImg.style.bottom = `${canvas.height - y - RADIUS}px`;

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        gameOverImg.style.display = 'block';
        gameOverImg.style.left = `${canvas.width / 2 - 80}px`;
        gameOverImg.style.top = `${canvas.height / 2 - 80}px`;
    }
}

animate(canvas, { update, draw });
