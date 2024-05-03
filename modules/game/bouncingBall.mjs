import { toRad } from "../engine/math.mjs";
import { animate } from "../engine/animation.mjs";
import { down } from "../engine/input.mjs";

const canvas = document.querySelector('#canvas');

const RADIUS = 20;

const GRAVITY = 1600;
const JUMP_SPEED = -600; // Velocidade inicial do pulo

let x = canvas.width / 2;
let y = canvas.height - RADIUS;

let velocityY = 0; // Velocidade vertical inicial

function update(time) {
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
}

function draw(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "pink";
    ctx.lineWidth = 2;

    ctx.arc(x, y, RADIUS, 0, toRad(360));

    ctx.fill();
    ctx.stroke();
}

animate(canvas, { update, draw });
