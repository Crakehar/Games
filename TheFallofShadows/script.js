class Game {
    constructor() {
        this.playerResources = {
            coins: 1000,
            maxResources: 5,
            resources: {
                'Дерево': 0,
                'Камень': 0,
                'Краска': 0,
                'Еда': 0,
                'Ткань': 0
            }
        
            
     
        };
        this.resourceMovements = [];
        this.lordHouses = this.initializeLordHouses();
        this.resources = ['Дерево', 'Камень', 'Краска', 'Еда', 'Ткань'];
        this.marketResources = {};
        this.resourceImages = this.initializeResourceImages();
        this.complexImages = this.initializeComplexImages();
        this.totalComplexesCreated = 0;
        this.isTurnFinished = false;
        this.timeLimit = 4000; 
        this.selectedHouse = null;
        this.resourcesAdded = false;
        this.announcementBoard = document.querySelector('.announcement-board');
        this.backgroundMusic = new Audio('sound/spirit.mp3');
        this.buttonSound = new Audio('sound/button-click.mp3');
        this.choiceSound = new Audio('sound/choice.mp3');
        this.init();
    }
        initializeLordHouses() {
            return [
                { 
                    name: 'The House of Hydra',
                    emblem: 'images/Дом Гидры.png',
                    hoverEmblem: 'images/House Hydra_hover.png',
                    additionalImage: "images/additional.png",
                    resources: ["Дерево", "Камень", "Краска", "Еда", "Ткань"] 
                },
                { 
                    name: 'The House of Minotaur',
                    emblem: 'images/Дом Минотавра.png',
                    hoverEmblem: 'images/Дом Минотавра_hover.png',
                    additionalImage: "images/additional.png",
                    resources: ["Дерево", "Камень", "Краска", "Еда", "Ткань"] 
                },
                { 
                    name: 'The House of Pegasus',
                    emblem: 'images/Дом Пегаса.png',
                    hoverEmblem: 'images/Дом Пегаса_hover.png',
                    additionalImage: "images/additional.png",
                    resources: ["Дерево", "Камень", "Краска", "Еда", "Ткань"] 
                },
                { 
                    name: 'The House of Unicorn',
                    emblem: 'images/Дом Единорога.png',
                    hoverEmblem: 'images/Дом Единорога_hover.png',
                    additionalImage: "images/additional.png",
                    resources: ["Дерево", "Камень", "Краска", "Еда", "Ткань"] 
                },
                { 
                    name: 'The House of Manticore',
                    emblem: 'images/Дом Мантикоры.png',
                    hoverEmblem: 'images/Дом Мантикоры_hover.png',
                    additionalImage: "images/additional.png",
                    resources: ["Дерево", "Камень", "Краска", "Еда", "Ткань"] 
                },
            ];
        }
        
    initializeResourceImages() {
            return {
              'Дерево': 'images/Дерево.jpg',
            'Камень': 'images/Камень.jpg',
            'Краска': 'images/Краска.jpg',
            'Еда': 'images/Еда.jpg',
            'Ткань': 'images/Ткань.jpg' 
        };
    }

     
    initializeComplexImages() {
        return {
            'Дерево_five': 'images/Дерево.jpg',
            'Камень_five': 'images/Камень.jpg',
            'Краска_five': 'images/Краска.jpg',
            'Еда_five': 'images/Еда.jpg',
            'Ткань_five': 'images/Ткань.jpg',
            'Дерево_three': 'images/Дерево.jpg',
            'Камень_three': 'images/Камень.jpg',
            'Краска_three': 'images/Краска.jpg',
            'Еда_three': 'images/Еда.jpg',
            'Ткань_three': 'images/Ткань.jpg',
            'Дерево_four': 'images/Дерево.jpg',
            'Камень_four': 'images/Камень.jpg',
            'Краска_four': 'images/Краска.jpg',
            'Еда_four': 'images/Еда.jpg',
            'Ткань_four': 'images/Ткань.jpg'
        };
    }

    
    
    
    startGame() {
        document.querySelector(".lord-houses").style.display = "none";
        document.querySelector(".start-game").style.display = "none";
        document.querySelector(".action-screen").style.display = "block";
    
        if (!this.selectedHouse) {
            return;
        }
    
        this.timeLeft = this.timeLimit;
        this.setupActions();
        this.startTimer();
        this.initializeChat();
        this.assignRandomResources(); 
        this.updateInterface();
      
    }
    

  init() {
       
        this.showHouseSelectionScreen();
        document.querySelector(".start-game").addEventListener("click", () => this.startGame());
        this.setupBackgroundMusic();
        document.addEventListener("DOMContentLoaded", () => {
            this.startMusic();
            this.setupStartGameButton();
            this.showHouseSelectionScreen();
        });
    }
    setupBackgroundMusic() {
        this.backgroundMusic.loop = true; 
        document.addEventListener('click', () => {
            this.backgroundMusic.play(); 
        });
    }
    showHouseSelectionScreen() {
        const houseContainer = document.querySelector(".lord-houses");
        houseContainer.innerHTML = '';
        this.lordHouses.forEach(house => {
            const div = document.createElement("div");
            div.className = "lord-house";
            this.createHouseElement(div, house);
            div.addEventListener("click", () => this.selectHouse(house));
            houseContainer.appendChild(div);
        });
    }
    
   
    startMusic() {
        this.backgroundMusic.play();
    }

    playChoiceSound() {
        this.choiceSound.play(); 
    }
    playButtonSound() {
        this.buttonSound.play(); 
    }
    
    playSound() {
        const sound = new Audio('sound/sound.mp3'); 
        sound.play();
    }
     
    updateResources(resource, amount) {
        if (!(resource in this.playerResources.resources)) {
            console.log(`Ресурс "${resource}" не найден!`);
            return false;
        }
    
        const oldAmount = this.playerResources.resources[resource];
        const newAmount = oldAmount + amount;
    

        if (newAmount > this.playerResources.maxResources) {
            console.log(`Невозможно добавить ${amount} "${resource}". Общее количество превысит ${this.playerResources.maxResources}.`);
            return false; 
        }

        this.playerResources.resources[resource] = newAmount;
        
       
        this.playerResources.totalAddedResources += amount;
    
        
        this.logResourceMovement(resource, oldAmount, newAmount, amount);
        
        return true; 
    }
    logResourceMovement(resource, oldAmount, newAmount, changeAmount) {
        const movement = {
            resource: resource,
            oldAmount: oldAmount,
            newAmount: newAmount,
            changeAmount: changeAmount,
            timestamp: new Date().toISOString()
        };
        this.resourceMovements.push(movement);
        console.log(`Движение ресурса: ${JSON.stringify(movement)}`);
    }



    showHouseSelectionScreen() {
        const houseContainer = document.querySelector(".lord-houses");
        houseContainer.innerHTML = '';
    
        this.lordHouses.forEach(house => {
            const div = document.createElement("div");
            div.className = "lord-house";
            div.dataset.houseName = house.name; 
    
            
            if (house.emblem) {
                const emblemImg = document.createElement("img");
                emblemImg.src = house.emblem;
                emblemImg.alt = house.name + " Emblem";
                emblemImg.classList.add("house-emblem", `emblem-${house.name.replace(/ /g, '-').toLowerCase()}`);
                div.appendChild(emblemImg);
    
                const hoverImg = document.createElement("img");
                hoverImg.src = house.hoverEmblem;
                hoverImg.alt = house.name + " Hover";
                hoverImg.classList.add("house-hover-emblem");
                div.appendChild(hoverImg);
    
                hoverImg.classList.add(`hover-${house.name.replace(/ /g, '-').toLowerCase()}`);
    
              
                const additionalImg = document.createElement("img");
                additionalImg.src = house.additionalImage; 
                additionalImg.alt = house.name + " Additional";
                additionalImg.classList.add("house-additional-image"); 
                additionalImg.style.display = 'none'; 
                div.appendChild(additionalImg);
    
                additionalImg.classList.add(`additional-${house.name.replace(/ /g, '-').toLowerCase()}`);
    
           
                div.addEventListener("mouseover", () => {
                    hoverImg.classList.add("visible");
                    additionalImg.style.display = 'block'; 
                });
                div.addEventListener("mouseout", () => {
                    hoverImg.classList.remove("visible");
                    additionalImg.style.display = 'none'; 
                });
    
         
                const houseClassMap = {
                    'The House of Hydra': 'description-гидры',
                    'The House of Minotaur': 'description-минотавра',
                    'The House of Pegasus': 'description-пегаса',
                    'The House of Unicorn': 'description-единорога',
                    'The House of Manticore': 'description-мантикоры',
                };
    
       
                const nameParagraph = document.createElement("p");
                nameParagraph.textContent = house.name;
                nameParagraph.className = houseClassMap[house.name] || '';
                nameParagraph.style.display = 'none';
                div.appendChild(nameParagraph);
    
                div.addEventListener("mouseover", () => {
                    nameParagraph.style.display = 'block';
                });
                div.addEventListener("mouseout", () => {
                    nameParagraph.style.display = 'none';
                });
    
    
                const descriptionParagraph = document.createElement("description");
                descriptionParagraph.textContent = house.description; 
                descriptionParagraph.className = house.descriptionClass; 
                descriptionParagraph.style.display = 'none'; 
                div.appendChild(descriptionParagraph);
    
      
                div.addEventListener("mouseover", () => {
                    descriptionParagraph.style.display = 'block';
                });
                div.addEventListener("mouseout", () => {
                    descriptionParagraph.style.display = 'none';
                });
            }
    
            div.addEventListener("click", () => this.selectHouse(house));
            houseContainer.appendChild(div);
        });
    }
    
    selectHouse(house) {
        if (this.selectedHouse) return;
    
        this.selectedHouse = house;
        this.playChoiceSound();
    
     
        const houseDiv = document.querySelector(`.lord-house[data-house-name="${house.name}"]`);
        const images = houseDiv.querySelectorAll("img");
        images.forEach(img => {
            img.classList.add("selected");
        });
    
        document.querySelector(".start-game").style.display = "block"; 
        document.querySelector('.house-table').style.display = 'block';
        this.updateInterface(); 
    }
    assignRandomResources() {
        if (!this.selectedHouse || this.assigningResourcesInProgress) return;
        this.assigningResourcesInProgress = true;
    
    
        const availableResources = Object.keys(this.playerResources.resources);
    
     
        let assignedResources = new Set();
    
        while (assignedResources.size < 2) {
            const randomIndex = Math.floor(Math.random() * availableResources.length);
            assignedResources.add(availableResources[randomIndex]);
        }
    
       
        if (!this.selectedHouse.resources) {
            this.selectedHouse.resources = {};
        }
    

        for (const resource of assignedResources) {
            const resourceAmount = 1; 
    
         
            if (this.playerResources.resources.hasOwnProperty(resource)) {
                
                this.playerResources.resources[resource] += resourceAmount;
            } else {
               
                this.playerResources.resources[resource] = resourceAmount;
            }
    
          
            console.log(`Resource assigned: ${resource}, Amount: ${resourceAmount}`);
    
   
            this.selectedHouse.resources[resource] = (this.selectedHouse.resources[resource] || 0) + resourceAmount;
        }
    
        this.assigningResourcesInProgress = false; 
        this.updateInterface(); 
    }
getRandomResource() {
    const resourceKeys = Object.keys(this.playerResources.resources);
    const randomIndex = Math.floor(Math.random() * resourceKeys.length);
    return resourceKeys[randomIndex];
}
    formatResources(resources) {
        return Object.entries(resources)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');

    }
    selectHouseForSpy() {
        console.log('selectHouseForSpy вызван');
        const houseContainer = document.querySelector(".house-selection");
        houseContainer.innerHTML = '';
    
     
        if (!this.lordHouses || this.lordHouses.length === 0) {
            console.warn('Дома не найдены или массив пуст');
            return;
        }
    
      
        const modal = document.createElement("div");
        modal.className = "modal"; 
        document.body.appendChild(modal);
    
       
        const selectSound = new Audio('path/to/select-sound.mp3'); 
    
        this.lordHouses.forEach(house => {
            console.log('Обрабатываем дом:', house);
            const div = document.createElement("div");
            div.className = "lord-house";
    
            if (house.emblem) {
                const emblemImg = document.createElement("img");
                emblemImg.src = house.emblem;
                emblemImg.alt = house.name;
                emblemImg.classList.add("house-embl");
                div.appendChild(emblemImg);
    
                
                const nameParagraph = document.createElement("span"); 
                nameParagraph.textContent = house.name;
                nameParagraph.style.display = 'none';
                div.appendChild(nameParagraph);
    
                emblemImg.addEventListener("mouseover", () => {
                    console.log(`Показать название дома: ${house.name}`);
                    nameParagraph.style.display = 'block'; 
                });
                emblemImg.addEventListener("mouseout", () => {
                    console.log(`Скрыть название дома: ${house.name}`);
                    nameParagraph.style.display = 'none'; 
                });
            }
    
            div.addEventListener("click", () => {
                console.log(`Выбран дом для шпионажа: ${house.name}`);
                selectSound.play(); 
                
               
                const allHouses = document.querySelectorAll('.lord-house');
                allHouses.forEach(houseDiv => {
                    houseDiv.classList.remove('selected'); 
                });
    
                
                div.classList.add('selected'); 
    
               
                this.spyOnHouse(house.name); 
                console.log(`Шпион направлен в дом ${house.name}.`);
    
               
                const notification = document.createElement("div");
                notification.textContent = `Шпион успешно отправлен в дом: ${house.name}`;
                document.body.appendChild(notification);
    
        
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 3000);
            });
    
            modal.appendChild(div); 
        });
    }
    
    setupActions() {
        const actionsContainer = document.querySelector(".actions");
        actionsContainer.innerHTML = ''; 
        
        actionsContainer.classList.add('actions-container'); 
    
       
        const createComplexButton = document.createElement("button");
        createComplexButton.classList.add('button'); 
        createComplexButton.innerText = "Создать Комплекс";
    
   
        const complexImg = document.createElement("img");
        complexImg.src = "images/complex.webp";
        complexImg.alt = "Создать Комплекс";
        createComplexButton.prepend(complexImg);
    
        createComplexButton.addEventListener("click", () => {
            this.createResourceComplex();
        });
    
        actionsContainer.appendChild(createComplexButton);
    
      
        const createSpyButton = document.createElement("button");
        createSpyButton.classList.add('button', 'spy-button'); 
        createSpyButton.innerText = "Отправить Шпиона";
    
       
        const spyImg = document.createElement("img");
        spyImg.src = "images/Spy.webp";
        spyImg.alt = "Отправить Шпион";
        createSpyButton.prepend(spyImg);
    
        createSpyButton.addEventListener("click", () => {
            console.log('Кнопка "Отправить Шпиона" нажата');
            this.selectHouseForSpy();
        });
    
        actionsContainer.appendChild(createSpyButton); 
    
    

 

    const iconPaths = {
        'Развитие': {
            default: 'images/development.webp',
            hover: 'images/development-hover.webp'
        },
        'Налог': {
            default: 'images/taxes.webp',
            hover: 'images/taxes-hover.webp'
        },
        'Оборона': {
            default: 'images/defense.webp',
            hover: 'images/defense-hover.webp'
        },
        'Набег': {
            default: 'images/attack.webp',
            hover: 'images/attack-hover.webp'
        }
    };
    
    const actions = [
        { name: 'Набег', coins: 10, resource: false, requiresHouse: true },
        { name: 'Развитие', coins: 10, resource: true, amount: 1 },
        { name: 'Налог', coins: 15, resource: false },
        { name: 'Оборона', coins: 10, resource: false }
        
    ];
    
  
    actions.forEach((action) => {
        const button = document.createElement("button");
        button.className = `action-button ${action.name.toLowerCase()}`; 
    

        const img = document.createElement("img");
        img.src = iconPaths[action.name].default; 
        img.alt = action.name;
        img.className = "action-icon"; 
    
        
        button.appendChild(img); 
        const textNode = document.createTextNode(action.name); 
        button.appendChild(textNode); 
    
        button.addEventListener("mouseover", () => {
            img.src = iconPaths[action.name].hover; 
        });
    
        button.addEventListener("mouseout", () => {
            img.src = iconPaths[action.name].default; 
        });
    
        button.addEventListener("click", () => {
            if (this.isTurnFinished) return;
    
            const actionSuccess = this.handleAction(action);
    
            if (actionSuccess) this.endTurn();
        });
    
        actionsContainer.appendChild(button);
    });
}
   createResourceComplex() {
    const complexesCreated = [];
    let incomeFromComplexes = 0; 
    
    
    for (const resource of Object.keys(this.selectedHouse.resources)) {
        while (this.selectedHouse.resources[resource] >= 5) { 
            this.selectedHouse.resources[resource] -= 5;
            incomeFromComplexes += 20;  
            console.log(`Создан комплекс из 5 ${resource}, добавлено 20 монет.`);
            complexesCreated.push({ type: 'five', resource });
            this.updateResources(resource, -5);
        }
    }
    
    
    for (const resource of Object.keys(this.selectedHouse.resources)) {
        while (this.selectedHouse.resources[resource] >= 4) { 
            this.selectedHouse.resources[resource] -= 4;
            incomeFromComplexes += 15;  
            console.log(`Создан комплекс из 4 ${resource}, добавлено 15 монет.`);
            complexesCreated.push({ type: 'four', resource });
            this.updateResources(resource, -4);
        }
    }

   
    for (const resource of Object.keys(this.selectedHouse.resources)) {
        while (this.selectedHouse.resources[resource] >= 3) { 
            this.selectedHouse.resources[resource] -= 3;
            incomeFromComplexes += 10;  
            console.log(`Создан комплекс из 3 ${resource}, добавлено 10 монет.`);
            complexesCreated.push({ type: 'three', resource });
            this.updateResources(resource, -3);
        }
    }

    this.updateInterface();
   
    if (complexesCreated.length > 0) {
        this.displayComplexImages(complexesCreated);

        this.expectedIncomeFromComplexes = (this.expectedIncomeFromComplexes || 0) + incomeFromComplexes;

        this.totalComplexesCreated = (this.totalComplexesCreated || 0) + complexesCreated.length;
        console.log(`Всего создано комплексов: ${this.totalComplexesCreated}`);
        this.updateExpectedIncomeDisplay();
    } else {
        console.log('Недостаточно ресурсов для создания комплексов.');
    }
}

displayComplexImages(complexesCreated) {
    const complexDisplayArea = document.querySelector(".complex-display");

    complexesCreated.forEach(complex => {
        const complexContainer = document.createElement("div");
        complexContainer.className = "complex-container";

        const img = document.createElement("img");
        const key = `${complex.resource}_${complex.type}`; 
        img.src = this.complexImages[key]; 
        img.alt = `${complex.type} комплекс из ${complex.resource}`;
        img.className = `complex-image ${complex.type}`; 

        if (img.src) {
            complexContainer.appendChild(img);
        } else {
            console.error(`Изображение не найдено для ключа: ${key}`);
            return; 
        }

        const countLabel = document.createElement("span");
        countLabel.className = "complex-label";
        countLabel.textContent = complex.type === 'five' ? '5' : complex.type === 'four' ? '4' : '3';  
        complexContainer.appendChild(countLabel);

      
        complexDisplayArea.appendChild(complexContainer);
    });

   
    if (complexesCreated.length > 0) {
        complexDisplayArea.style.display = 'block'; 
    }
}
    handleAction(action) {
       
        this.playerResources.coins = this.playerResources.coins || 0;
        this.playerResources.randomResource = this.playerResources.randomResource || 0;
    
        switch (action.name) {
            case 'Развитие':
                return this.handleDevelopment(action);
            case 'Налог':
                return this.handleMaxTax(action);
            case 'Оборона':
                return this.handleDefense(action);
            case 'Набег':
                return this.handleRaid(action);
            default:
                console.error('Неизвестное действие');
                return false; 
        }
    }
    handleDevelopment(action) {
        const coinsEarned = action.coins || 10;
        const resourceAmount = action.amount || 1;

    
        if (this.playerResources.coins < 0) {
            console.log('Недостаточно монет для развития!');
            return false;
        }

        if ((this.playerResources.randomResource || 0) + resourceAmount > this.playerResources.maxResources) {
            console.log('Превышено максимальное общее количество ресурсов (5).');
            return false;
        }

        this.playerResources.coins += coinsEarned;

        const resource = this.getRandomResource(); 
        if (this.selectedHouse) {
            this.updateResources(resource, resourceAmount); 
            this.selectedHouse.resources[resource] = (this.selectedHouse.resources[resource] || 0) + resourceAmount;
        } else {
            console.log('Дом не выбран. Ресурсы не были добавлены.');
            return false;
        }

        this.updateInterface();
        return true;
    }
    
    handleMaxTax(action) {
        const coinsEarned = action.coins || 15;
        this.playerResources.coins += coinsEarned;
        this.updateInterface();
        return true;
    }
    
    handleDefense(action) {
        const coinsEarned = action.coins || 10; 
        this.playerResources.coins += coinsEarned;
        this.updateInterface();
        return true;
    }
    
    handleRaid(action) {
        const coinsEarned = action.coins || 10; 
        this.playerResources.coins += coinsEarned;
        const houses = this.getHouses(); 
        this.chooseHouseForRaid(action, houses); 
        return false;
    }
    getHouses() {

        return []; 
    }
    chooseHouseForRaid(action, houses) {
        const houseChoice = prompt(`Выберите дом для набега:\n${houses.join('\n')}`);
    
        if (houses.includes(houseChoice)) {
            this.playerResources.coins += action.coins; 
            this.updateInterface();

        }
    }
    
    endTurn() {


         for (const resource in this.marketResources) {
            this.selectedHouse.resources[resource] = (this.selectedHouse.resources[resource] || 0) + 1; // Возвращаем 1 единицу каждого невостребованного ресурса
            console.log(`Возвращено 1 ${resource} обратно в запасы.`);
        }
    
        this.marketResources = {};
        this.isTurnFinished = true; 
        
           setTimeout(() => {
            this.isTurnFinished = false; 
            this.startNextTurn();
        },  9999); 
    }

    resetGameState() {
        this.selectedHouse = null;
        document.querySelector(".action-screen").style.display = "none";
        this.showHouseSelectionScreen();
        document.querySelector(".lord-houses").style.display = "block";
    }
        startNextTurn() {
            
                
    if (this.expectedIncomeFromComplexes) {
        this.playerResources.coins += this.expectedIncomeFromComplexes; 
        console.log(`Добавлено ${this.expectedIncomeFromComplexes} монет к текущему балансу.`);
        
      
    } else {
        console.log('Нет ожидаемого дохода для начисления.');
    }

  
            this.timeLeft = this.timeLimit; 
            this.setupActions(); 
            this.isButtonClicked = false; 
            
            this.startTimer(); 
            this.updateInterface();
        }
    
    updateExpectedIncomeDisplay() {
        const expectedIncomeLabel = document.querySelector(".expected-income"); 
        expectedIncomeLabel.textContent = `Доход: ${this.expectedIncomeFromComplexes || 0} монет`;
    }
    startTimer() {
        const timerDisplay = document.querySelector(".time-left");
        const totalTime = this.timeLeft; 
        const audio = new Audio('sound/sound.mp3'); 
        audio.loop = true; 
        audio.volume = 0.6;
        audio.play(); 
    
        const interval = setInterval(() => {
            this.timeLeft -= 1; 
            
         
            const totalSeconds = Math.floor(this.timeLeft / 250);
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            
         
            const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}.${Math.floor((this.timeLeft % 1000) / 10).toString().padStart(2, '0')}`;
            
            timerDisplay.innerText = formattedTime; 
    
    
            const percentage = this.timeLeft / totalTime; 
            timerDisplay.classList.remove('timer-green', 'timer-yellow', 'timer-red');
    
            if (percentage > 0.5) {
                timerDisplay.classList.add('timer-green');
            } else if (percentage > 0.2) {
                timerDisplay.classList.add('timer-yellow');
            } else {
                timerDisplay.classList.add('timer-red');
                timerDisplay.classList.toggle("blink"); 
            }
    
         
            timerDisplay.style.transform = `scale(${1 + (1 - percentage) * 0.5})`; 
          
            audio.playbackRate = 1 + (1 - percentage) * 3;
    
            if (this.timeLeft <= 0) {
                clearInterval(interval);
                audio.pause(); 
                timerDisplay.innerText = "Время вышло!";
                this.openTradeMenu();
                this.openAnnouncementBoard();
                this.playSound(); 
            }
        }, 1);
    }
    
    initializeChat() {
    const sendButton = document.querySelector(".send-chat");
    const chatMessageInput = document.querySelector(".chat-message");
    const chatLog = document.querySelector(".chat-log");
    const messageReceiver = document.querySelector(".message-receiver");
    const tabs = document.querySelectorAll(".chat-button");

  
    function populateOptions(type) {
        messageReceiver.innerHTML = ''; 
        if (type === 'trading') {
            const tradingOption = document.createElement("option");
            tradingOption.value = 'Торговый чат';
            tradingOption.innerText = 'Торговый чат';
            messageReceiver.appendChild(tradingOption);
        } else if (type === 'internal') {
            const internalOption = document.createElement("option");
            internalOption.value = 'Внутренний чат';
            internalOption.innerText = 'Внутренний чат';
            messageReceiver.appendChild(internalOption);
        } else if (type === 'general') {
            const generalOption = document.createElement("option");
            generalOption.value = 'Общий чат';
            generalOption.innerText = 'Общий чат';
            messageReceiver.appendChild(generalOption);
        }

     
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const selectedType = tab.getAttribute('data-chat-type');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            populateOptions(selectedType);
           
        });
    });

    sendButton.addEventListener("click", () => {
        const message = chatMessageInput.value.trim();
        const receiver = messageReceiver.value; 
    
        if (message) {
            const logEntry = document.createElement("div");
     
            switch(receiver) {
                case 'Общий чат':
                    logEntry.style.color = 'blue';
                    logEntry.innerText = `[Общий чат] ${this.selectedHouse.name}: ${message}`;
                    break;
                case 'Внутренний чат':
                    logEntry.style.color = 'green'; 
                    logEntry.innerText = `[Внутренний чат] ${this.selectedHouse.name}: ${message}`;
                    break;
                case 'Торговый чат':
                    logEntry.style.color = 'black'; 
                    logEntry.innerText = `[Торговый чат] ${this.selectedHouse.name}: ${message}`;
                    break;
            }
    
            chatLog.appendChild(logEntry);
            chatMessageInput.value = '';
            chatLog.scrollTop = chatLog.scrollHeight; 
        }
    });
    
    populateOptions('general');
    document.querySelector(".chat").style.display = "block";
}
    
    updateAnnouncements(message, type) {
        const announcementContainer = document.querySelector(".announcements");
        const newEntry = document.createElement("div");
    
        newEntry.innerText = message;
        announcementContainer.appendChild(newEntry);
    }

    setuptradeActions() {
        const tradeActionContainer = document.querySelector(".tradeactions");
        tradeActionContainer.innerHTML = ''; 
        const actionSuccess = this.handletradeAction(tradeAction);
        
        if (actionSuccess) {
            this.endTurn();
        }
    }
    
    handletradeAction(tradeAction) {
        this.playerResources.coins = this.playerResources.coins || 0;
        this.playerResources.randomResource = this.playerResources.randomResource || 0;
    
        switch (tradeAction.name) {
            case 'Покупка':
                if (this.playerResources.randomResource >= 5) {
                    console.log('Максимальное количество ресурсов уже в наличии.');
                    return false;
                }
                return this.buyResources(tradeAction);      
        }
    }
    
    buyResources(tradeAction) {
    const coinsSpent = tradeAction.coins || 1; 
    const resourceAmount = tradeAction.amount || 1;

    if (this.playerResources.coins < coinsSpent) {
        console.log('Недостаточно монет для покупки!');
        return false;
    }

    if ((this.playerResources.randomResource || 0) + resourceAmount > this.playerResources.maxResources) {
        console.log('Превышено максимальное количество ресурсов (5).');
        return false;
    }

    this.playerResources.coins -= coinsSpent; 

    const randomResourceIndex = Math.floor(Math.random() * this.resources.length);
    const selectedResource = this.resources[randomResourceIndex]; 

    if (this.selectedHouse) {

        this.playerResources.randomResource = (this.playerResources.randomResource || 0) + resourceAmount;

        this.selectedHouse.resources[selectedResource] = 
            (this.selectedHouse.resources[selectedResource] || 0) + resourceAmount;

        this.updateInterface();
        return true; 
    } else {
        console.log('Дом не выбран. Ресурсы не были добавлены.');
        return false; 
    }
}

    openTradeMenu() {
        const tradeMenu = document.querySelector(".trade-menu");
        tradeMenu.style.display = "block";
   
        const tradeActionContainer = document.querySelector(".tradeactions");
    tradeActionContainer.innerHTML = '';
    
        let resourceCost = 1;
    
        document.querySelector(".buy1").addEventListener("click", () => {
            const actionSuccess = this.buyResources({
                name: 'Покупка', 
                coins: resourceCost, 
                resource: true, 
                amount: 1 
            });
            
            if (actionSuccess) {
                resourceCost += 1;
            }
            this.playButtonSound();
        });

            const sellButtons = document.querySelectorAll('.sell');
            sellButtons.forEach(button => {
                const resource = button.getAttribute('data-resource');
                button.addEventListener('click', () => {
                    this.sellResourceWithPrice(resource); 
                });
            });

            document.querySelector(".close-trade-menu").addEventListener("click", () => {
                tradeMenu.style.display = "none"; 
            });
        
           
        }

        openAnnouncementBoard() {
            const announcementBoard = document.querySelector(".announcement-board");
            const announcementContainer = document.querySelector('.announcements');

            announcementContainer.innerHTML = ''; 

            this.updateAnnouncementBoard();
        
            announcementBoard.style.display = "block"; 
            console.log("Открытие доски объявлений"); 

            document.querySelector(".close-announcement-board").addEventListener("click", () => {
                announcementBoard.style.display = "none";
                console.log("Доска объявлений закрыта.");
            });
        }
  
        updateMarketInterface() {
            const marketContainer = document.querySelector(".market");
            marketContainer.innerHTML = '';
        
            for (const resource in this.marketResources) {
                const div = document.createElement('div');
                const item = this.marketResources[resource];
                marketContainer.appendChild(div);
            }
        }
        addResourceToMarket(resource, price) {
            if (price > 0) {
                this.marketResources[resource] = {
                    price: price,
                    house: this.selectedHouse.name 
                };
                this.updateMarketInterface(); 
                this.updateAnnouncementBoard(); 
            } else {
                console.log('Цена должна быть больше нуля!');
            }
        }    
        buyResources(tradeAction) {
            const coinsSpent = tradeAction.coins || 1;
            const resourceAmount = tradeAction.amount || 1;
    
            if (this.playerResources.coins < coinsSpent) {
                console.log('Недостаточно монет для покупки!');
                return false;
            }
    
            if ((this.playerResources.randomResource || 0) + resourceAmount > this.playerResources.maxResources) {
                console.log('Превышено максимальное количество ресурсов (5).');
                return false;
            }
    
            this.playerResources.coins -= coinsSpent;
    
            const resource = this.getRandomResource();
            if (this.selectedHouse) {
                this.updateResources(resource, resourceAmount); 
                this.selectedHouse.resources[resource] = (this.selectedHouse.resources[resource] || 0) + resourceAmount;
                this.updateInterface();
                return true;
            } else {
                console.log('Дом не выбран. Ресурсы не были добавлены.');
                return false;
            }
        }
        
        sellResourceWithPrice(resource) {
            if (this.selectedHouse.resources[resource] > 0) {
                const priceToSell = prompt(`Введите цену за 1 ${resource}:`);
                const price = parseFloat(priceToSell);
        
                if (isNaN(price) || price <= 0) {
                    console.log('Введите действительную цену.');
                    return;
                }

                this.selectedHouse.resources[resource]--;
                this.addResourceToMarket(resource, price);
                console.log(`Выставлено на продажу: ${resource} за ${price} монет.`);
                this.updateResources(resource,-1);
                this.updateMarketInterface();
                this.updateInterface();
            } else {
                console.log(`Недостаточно ${resource} для продажи!`);
            }
        }
        

 
    hideLargeImage() {
        const largeImageContainer = document.querySelector('.large-image-container');
        largeImageContainer.innerHTML = ''; 
        largeImageContainer.style.display = 'none';
    }
    updateResourcePrice(resource) {
        const newPrice = prompt(`Введите новую цену для ресурса ${resource}:`);

        if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
            this.marketResources[resource].price = parseFloat(newPrice);
            alert(`Цена для ресурса ${resource} успешно обновлена на ${newPrice}`);
        } else {
            alert('Некорректная цена! Пожалуйста, введите числовое значение.');
        }
    }
    updateInterface(complexName, requirements) {
        const inventory = document.querySelector('.inventory');
        if (inventory) {
            inventory.innerHTML = ''; 

            if (this.selectedHouse && this.selectedHouse.resources && Object.keys(this.selectedHouse.resources).length > 0) {
                let totalResources = 0;
                for (const [resource, quantity] of Object.entries(this.selectedHouse.resources)) {
                    for (let i = 0; i < quantity; i++) {
                        if (totalResources < this.playerResources.maxResources) { 
                            const img = document.createElement('img');
                            img.classList.add('resourceDisplay'); 
                            img.src = `images/${resource}.jpg`; 
                            img.alt = resource;

    
                            inventory.appendChild(img);
                            totalResources++;
                        }
                    }
                }
            } 

            const coinsDisplay = document.createElement('div');
            coinsDisplay.classList.add('coinsDisplay');
            coinsDisplay.style.backgroundImage = "url('images/Coins.jpg')";
            coinsDisplay.innerText = ` ${this.playerResources.coins}`;
            inventory.appendChild(coinsDisplay);
            console.log(this.playerResources.resources);
     }
    }
    
    updateAnnouncementBoard() {
        const announcementContainer = document.querySelector('.announcements');
        announcementContainer.innerHTML = ''; 
        
    
       for (const [resource, item] of Object.entries(this.marketResources)) {
            const div = document.createElement('div');
        
            const img = document.createElement('img');
            img.src = this.resourceImages[resource]; 
            img.alt = resource;
            img.style.width = '30px'; 
            img.style.cursor = 'pointer';
            img.style.marginLeft = '5px';
            
            img.addEventListener('click', () => {
                this.buyFromMarket(resource, item.price); 
            });
            
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.2)'; 
                img.style.transition = 'transform 0.2s'; 
            });
            
            img.addEventListener('mouseout', () => {
                img.style.transform = 'scale(1)'; 
            });
            
            const textSpan = document.createElement('span');
            textSpan.textContent = ` "${item.house}" За ${item.price} `; 
            textSpan.style.fontFamily = 'Arial, sans-serif'; 
            textSpan.style.cursor = 'pointer'; 
            
            textSpan.addEventListener('click', () => {
                this.buyFromMarket(resource, item.price); 
            });
            
            const coinImg = document.createElement('img');
            coinImg.src = 'images/Coins.jpg'; 
            coinImg.alt = 'монета';
            coinImg.style.width = '20px';
            coinImg.style.verticalAlign = 'middle'; 
            coinImg.style.marginLeft = '5px'; 
            
            const changePriceButton = document.createElement('button');
            changePriceButton.textContent = 'Изменить цену';


changePriceButton.addEventListener('click', () => {
    this.updateResourcePrice(resource); 
    this.updateAnnouncementBoard(); 
});

div.appendChild(img);
div.appendChild(textSpan);
div.appendChild(coinImg);
div.appendChild(changePriceButton); 

announcementContainer.appendChild(div);
        }
    }
    
    }


const game = new Game();