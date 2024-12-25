const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');

let playerPosition = gameContainer.clientWidth / 2 - 25;
let asteroids = [];
let lasers = [];
let score = 0;

function createAsteroid() {
    const asteroid = document.createElement('div');
    asteroid.className = 'asteroid';
    asteroid.style.left = Math.random() * (gameContainer.clientWidth - 30) + 'px';
    asteroid.style.top = '0px';
    gameContainer.appendChild(asteroid);
    asteroids.push(asteroid);
}

function moveAsteroids() {
    asteroids.forEach((asteroid, index) => {
        let top = parseFloat(asteroid.style.top);
        if (top < gameContainer.clientHeight) {
            asteroid.style.top = top + 5 + 'px';
        } else {
            gameContainer.removeChild(asteroid);
            asteroids.splice(index, 1);
        }
    });
}

function shootLaser() {
    const laser = document.createElement('div');
    laser.className = 'laser';
    laser.style.left = playerPosition + 22 + 'px';
    laser.style.bottom = '70px';
    gameContainer.appendChild(laser);
    lasers.push(laser);
}

function moveLasers() {
    lasers.forEach((laser, index) => {
        let bottom = parseFloat(laser.style.bottom);
        if (bottom < gameContainer.clientHeight) {
            laser.style.bottom = bottom + 5 + 'px';
        } else {
            gameContainer.removeChild(laser);
            lasers.splice(index, 1);
        }
    });
}

function checkCollision() {
    lasers.forEach((laser, lIndex) => {
        asteroids.forEach((asteroid, aIndex) => {
            const laserRect = laser.getBoundingClientRect();
            const asteroidRect = asteroid.getBoundingClientRect();
            if (laserRect.x < asteroidRect.x + asteroidRect.width &&
                laserRect.x + laserRect.width > asteroidRect.x &&
                laserRect.y < asteroidRect.y + asteroidRect.height &&
                laserRect.y + laserRect.height > asteroidRect.y) {
                gameContainer.removeChild(laser);
                gameContainer.removeChild(asteroid);
                lasers.splice(lIndex, 1);
                asteroids.splice(aIndex, 1);
                score++;
                console.log("Score:", score);
            }
        });
    });
}

function update() {
    moveAsteroids();
    moveLasers();
    checkCollision();
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= 10;
        player.style.left = playerPosition + 'px';
    }
    if (event.key === 'ArrowRight' && playerPosition < gameContainer.clientWidth - 50) {
        playerPosition += 10;
        player.style.left = playerPosition + 'px';
    }
    if (event.key === ' ') {
        shootLaser();
    }
});

setInterval(createAsteroid, 1000);
requestAnimationFrame(update);