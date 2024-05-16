import { toRad } from "../engine/math.mjs";
import { animate } from "../engine/animation.mjs";
import { down } from "../engine/input.mjs";

// const bolaImg = new Image();
// bolaImg.src = 'caminho/para/sua/imagem/bola.png'; // Substitua pelo caminho da imagem da bola

const pedraImg = new Image();
pedraImg.src = 'bug.png';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const RADIUS = 20;

const GRAVITY = 1600;
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
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "pink";
    ctx.lineWidth = 2;
    ctx.arc(x, y, RADIUS, 0, toRad(360));
    ctx.fill();
    ctx.stroke();

    

    // Desenha os obstáculos
    // ctx.fillStyle = "gray";
    // obstacles.forEach(obstacle => {
    //     ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    // });

    obstacles.forEach(obstacle => {
        ctx.drawImage(pedraImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Exibe a pontuação na tela
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    // Se o jogo acabou, exibe mensagem de "Game Over"
    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
    }
}

animate(canvas, { update, draw });
