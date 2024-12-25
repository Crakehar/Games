const cube = document.getElementById('cube');

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowUp':
            cube.style.transform += 'rotateX(-90deg)';
            break;
        case 'ArrowDown':
            cube.style.transform += 'rotateX(90deg)';
            break;
        case 'ArrowLeft':
            cube.style.transform += 'rotateY(-90deg)';
            break;
        case 'ArrowRight':
            cube.style.transform += 'rotateY(90deg)';
            break;
        case ' ':
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            document.querySelectorAll('.face').forEach(face => {
                face.style.backgroundColor = randomColor;
            });
            break;
    }
});