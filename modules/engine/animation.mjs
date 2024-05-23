import { _keyboard_listen } from "./input.mjs";

export function animate(canvas, { update = undefined, draw = undefined } = {}) {
    if (!canvas.getContext) {
        alert("Canvas not available!");
        return;
    }

    _keyboard_listen();

    const ctx = canvas.getContext('2d');
    let lastFrameTime = 0;

    function onFrame(time) {
        if (lastFrameTime !== 0) {
            const elapsed = (time - lastFrameTime) / 1000;
            if (update) update(elapsed);
            ctx.save();
            if (draw) draw(ctx);
            ctx.restore();
        }
        lastFrameTime = time;
        window.requestAnimationFrame(onFrame);
    }

    window.requestAnimationFrame(onFrame);
}
