const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

let player = {
    x: 50,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    gravity: 0.5,
    dy: 0,
    jumpStrength: -12,
    grounded: false,
    speed: 5 // Скорость передвижения игрока
};

let coins = [];
let score = 0;
let coinCount = 5;

function createCoins() {
    for (let i = 0; i < coinCount; i++) {
        const x = Math.random() * (canvas.width - 20);
        const y = Math.random() * (canvas.height - 50) + 20;
        coins.push({ x, y, width: 20, height: 20 });
    }
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawCoins() {
    ctx.fillStyle = 'gold';
    coins.forEach(coin => {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });
}

function update() {
    player.dy += player.gravity;
    player.y += player.dy;

    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
        player.grounded = true;
    }

    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.height + player.y > coin.y) {
            score++;
            coins.splice(index, 1);
        }
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawCoins();
    
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function jump() {
    if (player.grounded) {
        player.dy = player.jumpStrength;
        player.grounded = false;
    }
}

// Новые переменные для перемещения
let keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.code] = true; // Устанавливаем состояние нажатия клавиши
    if (e.code === 'Space') {
        jump();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false; // Сбрасываем состояние отпускания клавиши
});

function movePlayer() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed; // Движение влево
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
        player.x += player.speed; // Движение вправо
    }
}

// Основной цикл игры
function gameLoop() {
    movePlayer(); // Обновляем позицию игрока согласно нажатым клавишам
    update(); // Обновляем состояние игры
    requestAnimationFrame(gameLoop); // Запускаем следующий кадр
}

createCoins();
gameLoop(); // Запускаем игровой цикл