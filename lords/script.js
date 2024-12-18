
const houses = [
    'Дом Минотавра',
    'Дом Мантикора',
    'Дом Единорога',
    'Дом Кракена',
    'Дом Пегаса'
];

const resources = [
    'ткань',
    'краска',
    'дерево',
    'камень',
    'еда'
];

const backgroundMusic = document.getElementById('background-music'); // фоновая музыка
const container = document.getElementById('housesContainer');
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
let isPlaying = false;
let houseData = [];
let actionsReady = [];
let botHouseData = [];

document.getElementById('menuToggle').addEventListener('click', function() {
    toggleSidebar();
});
// Инициализация состояния игры при загрузке страницы
window.addEventListener('load', () => {
    // Здесь можно добавить начальную логику или настройки
    container.innerHTML = '<p>Нажмите "Играть", чтобы начать игру!</p>';
    menuToggle.src = 'path/menu.webp'; // Устанавливаем начальный иконку для меню
});
// Запуск игры
startGame();

function toggleSidebar() {
    const icon = menuToggle; // Используем уже определённый элемент
    sidebar.classList.toggle('show');

    // Проверяем состояние боковой панели и меняем иконку
    if (sidebar.classList.contains('show')) {
        sidebar.style.display = 'block'; // Показываем боковую панель
        icon.src = 'path/menu_open.webp'; // Меняем иконку на открытую
    } else {
        sidebar.style.display = 'none'; // Скрываем боковую панель
        icon.src = 'path/menu.webp'; // Возвращаем иконку к закрытой
    }
}

function toggleMusic() {
    console.log("Текущая музыка:", isPlaying ? "играет" : "выключена");
    if (isPlaying) {
        stopMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    backgroundMusic.play().then(() => {
        isPlaying = true; // Устанавливаем состояние на "играет"
        console.log("Музыка начинает играть");
    }).catch(error => {
        console.error("Ошибка воспроизведения музыки:", error);
    });
}

function stopMusic() {
    backgroundMusic.pause(); // Остановить музыку
    backgroundMusic.currentTime = 0; // Возвратить время воспроизведения на начало
    isPlaying = false; // Устанавливаем состояние на "не играет"
    console.log("Музыка остановлена");
}

// Запуск игры
function startGame() {
    // Инициализация данных о домах игрока
    houseData = houses.map(house => ({
        name: house,
        resources: [],
        coins: 0,
        action: null,
    }));
    
    // Инициализация данных о домах бота
    botHouseData = houses.map(house => ({
        name: house,
        resources: [],
        coins: 0,
        action: null,
    }));
    
    actionsReady = new Array(houseData.length).fill(false);
    
    container.innerHTML = ''; 

    houseData.forEach((house, index) => {
        const houseElement = document.createElement('li');
        houseElement.textContent = house.name;

        // Событие нажатия левой кнопкой мыши для выбора дома
        houseElement.addEventListener('click', () => {
            selectHouse(index); // Выбор дома
        });

        // Событие контекстного меню
        houseElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            showMenu(event, 'your-menu-id'); // пример id вашего меню
            collectCoins('max_tax', index);
        });

        container.appendChild(houseElement);
    });

    distributeResources();
    updateGameState();

}


function selectHouse(index) {
    currentHouseIndex = index; // Устанавливаем выбранный дом
    console.log(`Выбран дом: ${houses[index]}`); // Вывод информации о выбранном доме
}

function botTurn() {
    botHouseData.forEach((house, index) => {
        // Логика действий бота
        const randomAction = Math.random() < 0.5 ? 'max_tax' : 'development'; // случайное действие
        
        collectCoins(randomAction, index);
    });
}

function collectCoins(action, houseIndex) {
    console.log(`Сбор монет для дома ${houseIndex}, действие: ${action}`); // Здесь вывод данных
    const house = houseData[houseIndex];
    let coinsToGive = 0;

    switch (action) {
        case 'max_tax':
            coinsToGive = 10;
            break;
        case 'development':
            coinsToGive = 5;
            break;
        case 'defense':
            coinsToGive = 0; // ничего не дается
            break;
    }

    house.coins += coinsToGive; 
    actionsReady[houseIndex] = true;
    house.action = action;

    if (allActionsReady()) {
        executeActions();
        botTurn(); // Теперь вызываем ход бота после того, как все действия готовы
    } else {
        updateGameState();
    }
}
function initializeChat() {
    const sendButton = document.getElementById("send-chat");
    const chatMessageInput = document.getElementById("chat-message");
    const chatLog = document.getElementById("chat-log");

    sendButton.addEventListener("click", () => {
        const message = chatMessageInput.value.trim();
        if (message) {
            const logEntry = document.createElement("div");
            logEntry.innerText = `${this.selectedHouse.name}: ${message}`;
            chatLog.appendChild(logEntry);
            chatMessageInput.value = '';
        }
    });

    document.getElementById("chat").style.display = "block"; // Показываем чат
}
// Отображение контекстного меню
function showMenu(event, menuId) {
    event.preventDefault(); 
    closeAllMenus(); 
    const menu = document.getElementById(menuId);
    menu.style.display = 'block'; 
    menu.style.left = `${event.pageX}px`; 
    menu.style.top = `${event.pageY}px`;

    function handleClickOutside(event) {
        if (!menu.contains(event.target)) {
            closeMenu(menuId);
            window.removeEventListener('click', handleClickOutside);
        }
    }
    window.addEventListener('click', handleClickOutside);
}
// Функции для закрытия меню
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.display = 'none'; // Скрываем меню
}
function closeAllMenus() {
    const menus = document.querySelectorAll('.popup-menu');
    menus.forEach(menu => {
        menu.style.display = 'none'; // Скрываем все меню
    });
}

function performAction(action) {
    console.log(`Выбрано действие: ${action}`);
    closeAllMenus(); // Закрываем меню после выбора действия
}

// Отображение контекстного меню
function showMenu(event, menuId) {
    event.preventDefault(); // Отключаем стандартное меню
    closeAllMenus(); // Скрываем все открытые меню
    const menu = document.getElementById(menuId);
    menu.style.display = 'block'; // Показываем конкретное меню
    menu.style.left = `${event.pageX}px`; // Устанавливаем позицию по X
    menu.style.top = `${event.pageY}px`; // Устанавливаем позицию по Y

    // Обработчик для закрытия меню
    function handleClickOutside(event) {
        if (!menu.contains(event.target)) {
            closeMenu(menuId); // Закрываем меню
            window.removeEventListener('click', handleClickOutside);
        }
    }
    window.addEventListener('click', handleClickOutside);
}

// Функция для закрытия конкретного меню
function closeMenu(menuId) {
    const menu = document.getElementById(menuId);
    menu.style.display = 'none'; // Скрываем меню
}

// Функция распределения ресурсов
function distributeResources() {
    houseData.forEach(house => {
        for (let i = 0; i < 2; i++) {
            const resource = resources[Math.floor(Math.random() * resources.length)];
            house.resources.push(resource);
        }
    });
}


// Проверка готовности всех действий
function allActionsReady() {
    return actionsReady.every(ready => ready);
}

// Обновление состояния игры
function updateGameState() {
    container.innerHTML = ''; 

    // Отображение данных игрока
    houseData.forEach((house, index) => {
        const houseElement = document.createElement('li');
        houseElement.textContent = `${house.name} - Ресурсы: ${house.resources.join(', ')}, Монеты: ${house.coins}`;

        // Событие контекстного меню для сбора монет
        houseElement.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            collectCoins('max_tax', index);
        });

        container.appendChild(houseElement);
    });

    // Отображение данных бота
    botHouseData.forEach((house) => {
        const botElement = document.createElement('li');
        botElement.textContent = `${house.name} (Бот) - Ресурсы: ${house.resources.join(', ')}, Монеты: ${house.coins}`;
        container.appendChild(botElement);   
    });
}

document.getElementById('playButton').addEventListener('click', startGame);
document.getElementById('toggleMusicButton').addEventListener('click', toggleMusic);

// Инициализация состояния игры при загрузке страницы
window.addEventListener('load', () => {
    // Здесь можно добавить начальную логику или настройки
    container.innerHTML = '<p>Нажмите "Играть", чтобы начать игру!</p>';
    menuToggle.src = 'path/menu.webp'; // Устанавливаем начальный иконку для меню
});
// Запуск игры
startGame();