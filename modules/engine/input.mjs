const down_keys = {}

export const Key = Object.freeze({
    LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, SPACE: 32,
    A: '65', D: '68', W: '87', S: '83'
})

export function _keyboard_listen() {
    document.addEventListener("keydown", event => down_keys[event.code] = true);
    document.addEventListener("keyup", event => down_keys[event.code] = false);
}

export const down = (key) => down_keys[key] === true
