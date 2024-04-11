export const Key = Object.freeze({
    LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32,
    A: '65', D: '68', W: '87', S: '83'
})

const pressed_keys = {}

function onKeyDown(event) {
    pressed_keys[event.keyCode] = true
}

function onKeyUp(event) {
    pressed_keys[event.keyCode] = false
}

export function _keyboard_use() {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
}

export const down = (key) => pressed_keys[key] === true
