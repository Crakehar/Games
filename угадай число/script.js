const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-guess');
const resultMessage = document.getElementById('result-message');
const restartButton = document.getElementById('restart');

let randomNumber = Math.floor(Math.random() * 100) + 1;

submitButton.addEventListener('click', () => {
    const userGuess = Number(guessInput.value);
    
    if (userGuess < 1 || userGuess > 100) {
        resultMessage.textContent = 'Пожалуйста, введите число от 1 до 100.';
        return;
    }

    if (userGuess === randomNumber) {
        resultMessage.textContent = 'Поздравляем! Вы угадали число!';
        resultMessage.style.color = 'green';
        restartButton.style.display = 'block';
        submitButton.disabled = true;
    } else if (userGuess < randomNumber) {
        resultMessage.textContent = 'Слишком низко! Попробуйте снова.';
    } else {
        resultMessage.textContent = 'Слишком высоко! Попробуйте снова.';
    }
});

restartButton.addEventListener('click', () => {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guessInput.value = '';
    resultMessage.textContent = '';
    restartButton.style.display = 'none';
    submitButton.disabled = false;
});