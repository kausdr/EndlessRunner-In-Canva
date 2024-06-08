var music = document.getElementById("music");
music.play();


window.onload = function() {
    const canvas = document.getElementById('titleCanvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = 'images/bugrunner.png';

    img.onload = function() {
        animate();
    };

    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let amplitude = 20;
    let angle = 0;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let dy = Math.sin(angle) * amplitude;

        ctx.drawImage(img, x - img.width / 2, y + dy - img.height / 2);

        angle += 0.05;

        requestAnimationFrame(animate);
    }
};