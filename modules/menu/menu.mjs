document.addEventListener('DOMContentLoaded', (event) => {
    var music = document.getElementById("music");
    music.play().catch(function(e) {
        console.log('Playback prevented:', e); 
    });
});

window.onload = function() {
    const canvas = document.getElementById('titleCanvas');
    const ctx = canvas.getContext('2d');

    // Carregar a imagem do título
    const img = new Image();
    img.src = 'images/bugrunner.png'; // Substitua pelo caminho da sua imagem

    img.onload = function() {
        animate();
    };

    // Posição inicial
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let amplitude = 20; // A altura do salto
    let angle = 0; // Ângulo inicial

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcular a nova posição vertical
        let dy = Math.sin(angle) * amplitude;

        // Desenhar a imagem
        ctx.drawImage(img, x - img.width / 2, y + dy - img.height / 2);

        // Atualizar o ângulo
        angle += 0.05; // Ajuste a velocidade do salto

        requestAnimationFrame(animate);
    }

};
