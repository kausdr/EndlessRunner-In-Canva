import { toRad } from "../engine/math.mjs";
import { animate } from "../engine/animation.mjs";
import { down } from "../engine/input.mjs";

const pedraImg = new Image();
pedraImg.src = 'images/bug.png';

const bolaImg = new Image();
bolaImg.src = 'images/boy.webp';

const scoreImg = new Image();
scoreImg.src = 'images/score.webp'; // Substitua pelo caminho da imagem do score

const gameOverImg = new Image();
gameOverImg.src = 'images/gameover.png'; // Substitua pelo caminho da imagem de Game Over

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const RADIUS = 30;
const GRAVITY = 1300;
const JUMP_SPEED = -600; // Velocidade inicial do pulo

let x = canvas.width / 2;
let y = canvas.height - RADIUS;

let velocityY = 0; // Velocidade vertical inicial

let obstacles = [];
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 60;
const OBSTACLE_SPEED = 250; 

let gameOver = false;
let score = 0; 

function generateObstacle() {
    // Verifica se não há obstáculos ou se o último obstáculo está longe o suficiente    
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x + OBSTACLE_WIDTH < canvas.width - OBSTACLE_WIDTH * 2) {
        const obstacle = {
            x: canvas.width,
            y: canvas.height - OBSTACLE_HEIGHT,
            width: OBSTACLE_WIDTH,
            height: OBSTACLE_HEIGHT,
        };
        obstacles.push(obstacle);
    }
}

function update(time) {
    if (gameOver) return;

    // Deslocamento da bola
    if (down('ArrowUp') && y >= canvas.height - RADIUS) {
        velocityY = JUMP_SPEED; // Define uma velocidade inicial para o pulo
    }

    // Lógica de movimento vertical da bola (gravidade)
    velocityY += GRAVITY * time; // Aumento da velocidade devido à gravidade

    // Atualiza a posição vertical da bola de acordo com a velocidade vertical
    y += velocityY * time;

    // Verifica se a bola atingiu o chão e redefine a posição vertical e a velocidade vertical
    if (y + RADIUS >= canvas.height) {
        y = canvas.height - RADIUS;
        velocityY = 0;
    }

    // Verifica colisões com os obstáculos
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

    // Atualiza a posição horizontal dos obstáculos
    obstacles.forEach(obstacle => {
        obstacle.x -= OBSTACLE_SPEED * time;

        // Remove o obstáculo se estiver fora do canvas
        if (obstacle.x + OBSTACLE_WIDTH < 0) {
            obstacles.shift();
            score++;
        }
    });

    // Gera um novo obstáculo aleatoriamente
    if (Math.random() < 0.01) {
        generateObstacle();
    }
}

function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha a bola
    ctx.drawImage(bolaImg, x - RADIUS * 3, y - RADIUS * 3, RADIUS * 4, RADIUS * 4);

    // Desenha os obstáculos
    obstacles.forEach(obstacle => {
        ctx.drawImage(pedraImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Desenha a imagem do score
    const scoreImgX = 10;
    const scoreImgY = -10;
    const scoreImgWidth = 100; // Ajuste conforme necessário
    const scoreImgHeight = 70; // Ajuste conforme necessário
    ctx.drawImage(scoreImg, scoreImgX, scoreImgY, scoreImgWidth, scoreImgHeight);

    // Desenha a pontuação ao lado da imagem do score
    const scoreTextX = scoreImgX + scoreImgWidth + 10; // 10px de espaço entre a imagem e o texto
    const scoreTextY = scoreImgY + scoreImgHeight / 2 + 10; // Ajuste conforme necessário
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(score, scoreTextX, scoreTextY);

    // Se o jogo acabou, exibe a imagem de "Game Over"
    if (gameOver) {
        const gameOverImgX = canvas.width / 2 - 200; // Ajuste conforme necessário
        const gameOverImgY = canvas.height / 2 - 100; // Ajuste conforme necessário
        const gameOverImgWidth = 400; // Ajuste conforme necessário
        const gameOverImgHeight = 200; // Ajuste conforme necessário
        ctx.drawImage(gameOverImg, gameOverImgX, gameOverImgY, gameOverImgWidth, gameOverImgHeight);
    }
}

animate(canvas, { update, draw });
