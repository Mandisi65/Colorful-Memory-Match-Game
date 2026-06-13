const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink', 
    'red', 'blue', 'green', 'purple', 'orange', 'pink'];
let cards = shuffle(colors.concat(colors));
let selectedCards = [];
let score = 0;
let timeLeft = 30;
let gameInterval;

const startButton = document.getElementById('startbtn');
const gameContainer = document.getElementById('game-container');
const scoreElements = document.getElementById('score');
const timerElements = document.getElementById('timer');

function generateCards(){
    for(const color of cards){
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.textContent = '?';
        gameContainer.appendChild(card);
    }
}

function shuffle(array){
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function handleCardClick(event){
    const card = event.target;
    if (!card.classList.contains('card') || card.classList.contains('matched')){
        return;
    }

    card.textContent = card.dataset.color;
    card.style.backgroundColor = card.dataset.color;
    selectedCards.push(card);

    if(selectedCards.length === 2){
        setTimeout(checkMatch, 500);
    }
}

function checkMatch(){
    const [card1, card2] = selectedCards;
    
    if(card1.dataset.color === card2.dataset.color){
        card1.classList.add('matched');
        card2.classList.add('matched');
        
        score += 2;
        scoreElements.textContent = `Score: ${score}`;
    }else{
        card1.classList.add('?');
        card2.classList.add('?');
        card1.style.backgroundColor = '#ddd';
        card2.style.backgroundColor = '#ddd'

    }

    selectedCards = [];
}

function startGame(){
    let timeLeft = 30;
    startButton.disabled = true;
    score = 0;
    scoreElements.textContent = `Score: ${score}`;
    startGameTimer(timeLeft);
    cards = shuffle(colors.concat(colors));
    selectedCards = [];
    gameContainer.innerHTML = '';
    generateCards();
    gameContainer.addEventListener('click', handleCardClick);
}

function startGameTimer(timeLeft){
    timerElements.textContent = `Time left: ${timeLeft}`;
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElements.textContent = `Time left: ${timeLeft}`;

        if(timeLeft === 0){
            clearInterval(gameInterval);
            let timeLeft = 30;
            alert('Gme Over!');
            startButton.disabled = false;
        }
    }, 1000);
}

startbtn.addEventListener('click', startGame);