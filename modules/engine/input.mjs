const pressed_keys = {};
let initialized = false;

export function _keyboard_listen() {
    if (initialized) return;
    document.addEventListener("keydown", event => pressed_keys[event.code] = true);
    document.addEventListener("keyup", event => pressed_keys[event.code] = false);
    initialized = true;
}

export const down = (code) => pressed_keys[code] === true;
export const onKeydown = (code, callback) => {
    document.addEventListener('keydown', (event) => {
        if (event.code === code) {
            callback(event);
        }
    });
};