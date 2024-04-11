import {toRad} from "../engine/math.mjs";
import {animate} from "../engine/animation.mjs";
import {down, Key} from "../engine/input.mjs";

const canvas = document.querySelector('#canvas');

const RADIUS = 20;
const SPEED = 400;

let x = canvas.width / 2
let y = canvas.height / 2
let velocity = SPEED;

function update(time) {
    //Deslocamento da bola
    if (down(Key.UP) && y > RADIUS) y -= velocity * time;
    else if (down(Key.DOWN) && y <= canvas.height - RADIUS) y += velocity * time;

    if (down(Key.LEFT) && x > RADIUS) x -= velocity * time;
    else if (down(Key.RIGHT) && x <= canvas.width - RADIUS) x += velocity * time;
}

function draw(ctx) {
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = "pink";
    ctx.lineWidth = 2;

    ctx.arc(x, y, RADIUS, 0, toRad(360));

    ctx.fill();
    ctx.stroke();
}

animate(canvas, {update, draw})
