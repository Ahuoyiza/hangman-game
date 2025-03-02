// game data for each category
const categories = {
    animals: {
        words: ['mamba', 'penguin', 'peacocks', 'cat', 'leopard', 'cheetah', 'hippopotamus', 'iguana', 'whale', 'butterfly', 'eagle', 'periwinkle'],
        hint: 'guess the animal'
    },
    countries: {
        words: ['canada', 'nigeria', 'senegal', 'ghana', 'nicaragua', 'honduras', 'cameroon', 'malawi', 'Australia', 'benin', 'rwanda'],
        hint: 'guess the country'
    },
    fruits: {
        words: ['apple', 'soursop', 'kiwi', 'avocado', 'watermelon', 'pineapple', 'date', 'orange', 'strawberry', 'tangerine', 'mango'],
        hint: 'guess the fruit'
    },
    sports: {
        words: ['soccer', 'javelin', 'discus', 'shortput', 'tennis', 'archery', 'basketball', 'volleyball', 'polevault', 'fencing', 'baseball', 'swimming'],
        hint: 'guess the sport'
    },
    movies: {
        words: [
          'inception', 'titanic', 'avatar', 'gladiator', 'coco',
          'godfather', 'pulpfiction', 'interstellar', 'matrix', 'rocky', 'joker'
        ],
        hint: 'Guess the movie'
      },
      colors: {
        words: [
          'red', 'blue', 'green', 'yellow', 'purple',
          'orange', 'pink', 'brown', 'black', 'white', 'magenta', 'cyan', 'violet'
        ],
        hint: 'Guess the color'
      },
      cars: {
        words: [
          'tesla', 'ford', 'bmw', 'audi', 'mercedes',
          'chevrolet', 'honda', 'toyota', 'nissan', 'volkswagen', 'volvo', 'hyundai', 'kia'
        ],
        hint: 'Guess the car brand'
      }
}
// global variables
let currentWord = '' //split each letter as an item in a n array
let guessedLetters = []
let score = 0
let maxTries = 8
let wrongGuesses = 0

// state variables
// DOM elements
const wordDisplay = document.getElementById('word-display');
const keyboard = document.getElementById('keyboard');
const messageElement = document.getElementById('message');
const newGameBtn = document.getElementById('new-game-btn');
const triesLeft  = document.getElementById('tries-left');
const scoreElement = document.getElementById('score');
const hintElement = document.getElementById('hint');
const categorySelect = document.getElementById('category-select');
const hangmanParts = document.querySelectorAll('.hangman-part');


//gameplay:
// 1. there is a current word (randomly chosen by our program from the dataset)
// 2. player will guess the word, letter by letter 
// 3. once a letter that is part of a word is clicked, if the letter appears multiple times in the word, it places that letter everywhere
// 4. there is place to display guessed letters (initially be dashes)
// 5. when the right or wrong letter is clicked, we should give interaction feedback colour
// 6. we have to  store correct guesses, match it with current word set
// 7. keep scores
// 8. how many tries (maximum guesses allowed)

// main function that initialises the game
function gamePlay(){
    // clean out the  the state
    guessedLetters = []
    wrongGuesses = 0

    // reset the visual part if the state
    triesLeft.textContent = maxTries;
    messageElement.textContent = ' ';

    // get current category
    const category = categorySelect.value;
    hintElement.textContent = categories[category].hint;
   

    // generate the random word from the chosen category
    const words = categories[category].words;
    currentWord = words[Math.floor(Math.random() * words.length)];

    console.log(currentWord)

    // function to display guessed letters(word)
    createWordDisplay();

    // create keyboard
    createKeyboard();

    // create function reset hangman 
    resetHangman()
}
function createWordDisplay(){
    wordDisplay.innerHTML = '';
    for (let i = 0; i < currentWord.length; i++){
        const letterBox =  document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.dataset.letter = currentWord[i];
        wordDisplay.appendChild(letterBox)
    }
}
function createKeyboard(){
    keyboard.innerHTML = '';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    for(let i = 0; i < letters.length; i++){
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letters[i];
        key.addEventListener('click', () => handleGuess(letters[i]));
        keyboard.appendChild(key);
    }
}

function resetHangman(){
    hangmanParts.forEach((part, index)=> {
        if (index < 2){
            part.style.display = 'block'
        }else{
            part.style.display = 'none'
        }
    })
}

function handleGuess(letter){
    // deny function run when tries max have been reached or the letter has been clicked before
    if (guessedLetters.includes(letter) || wrongGuesses >= maxTries || isWordComplete() ){ 
        return
    }

    guessedLetters.push(letter);

    // update the keyboard button when it has been used
    const key  = [...keyboard.children].find(key => key.textContent === letter);
    key.classList.add('used');

    if (currentWord.includes(letter)){
        key.classList.add('correct');
        updateWordDisplay(letter);
        
    }else{
        key.classList.add('wrong');
        wrongGuesses ++
        triesLeft.textContent = maxTries - wrongGuesses;
        updateHangman();
    }
}

function updateWordDisplay (letter){
    const letterBoxes = wordDisplay.children;
    for (let i = 0; i < letterBoxes.length; i++){
        if(letterBoxes[i].dataset.letter === letter){
            letterBoxes[i].textContent = letter;
        }
    }
}
function updateHangman(){
    if(wrongGuesses + 1 < hangmanParts.length){
        hangmanParts[wrongGuesses + 1].style.display ='block';
    }
}
function isWordComplete(){
    const letterBoxes = wordDisplay.children;
    for(let i = 0; i < letterBoxes.length; i++){
        const letter  = letterBoxes[i].dataset.letter;
        if(!guessedLetters.includes(letter)){
            return false;
        }
    }return true;
}

// function handleWin() {

// }
// event listeners
categorySelect.addEventListener('change', gamePlay)
newGameBtn.addEventListener('click', gamePlay)
// call function
gamePlay() 