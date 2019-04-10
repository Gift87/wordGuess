// Game word array
var gameWordList = ["fresh prince", "martin", "moesha", "all that",
    "family matters", "living single", "the cosbys"
];

var wins = 0;

var remainingGuesses = 10;
var correctGuessCounter = 0;

var underScore = [];
var userGuess = [];
var correctGuess = [];
var wrongGuess = [];

var randomWord;

// MAIN
//==========================================================================================

// Function to clear and reset word, underscores, and pertaining empty arrays.
function clearAndReset() {
    // Select new random word.
    randomWord = selectRandomWord(gameWordList);
    // Reset underscores for new word.
    underScore = createUnderScoreList(randomWord);
    // Reset remaining guesses to 10.
    guessesLeft = 10;
    // Reset correct guess counter.
    correctGuessCounter = 0;
    // Reset correct guess to an empty array.
    correctGuess = [];
    // Reset user guess to an empty array.
    userGuess = [];
    // Reset incorrect guess to an empty array.
    wrongGuess = [];
    // Hook into and update html.
    document.getElementById('wrong-guesses').innerHTML = wrongGuess.join(" ");
    document.getElementById('guesses-left').innerHTML = guessesLeft;
    document.getElementById('word-blanks').innerHTML = underScore.join(' ');
};

// BEGIN GAME.
gameStart();

// Game Startup.
function gameStart() {
    randomWord = selectRandomWord(gameWordList);
    underScore = createUnderScoreList(randomWord);
};

// Function for selecting a random word.
function selectRandomWord(words) {
    var selection = words[Math.floor(Math.random() * words.length)];
    console.log("random word = " + selection);
    return selection;
};

function createUnderScoreList(word) {
    var underscoreList = [];
    for (let i = 0; i < word.length; i++) {
        underscoreList.push('_');
        // Hook into html to replace/update underscores on screen for each chosen word.
        document.getElementById('word-blanks').innerHTML = underscoreList.join(' ');
    }
    return underscoreList;
};

// User input.
document.onkeyup = function (event) {
    userGuess = event.key;
    // Run to assess if user input = letters inside random word.
    if (randomWord.indexOf(userGuess) > -1) {

        for (let i = 0; i < randomWord.length; i++) {

            if (randomWord[i] === userGuess) {
                underScore[i] = userGuess;
                // If correct user input, push user input to correctGuess array.
                correctGuess.push(userGuess);
                console.log(correctGuess);

                //If: user input correct, hook into and push/display correct letters in place of underscore placeholder.
                document.getElementById('word-blanks').innerHTML = underScore.join(' ');

                correctGuessCounter++;
                guessesLeft = 10;
                winOrLose();
            }
        }
    } else {
        // Push incorrect user input into empty incorrectGuess array.
        incorrectGuess.push(userGuess);

        // Hook into html and push/display incorrect guesses in corresponding box.
        document.getElementById('already-guessed').innerHTML = wrongGuess.join(" ");

        // Else: for each incorrect user key entry, decrease number of guesses remaining by 1.
        guessesLeft--;
        
        // Hook into html to update number of guesses remaining.
        document.getElementById('guesses-left').innerHTML = guessesLeft;

        console.log(wrongGuess);

        winOrLose();
    }
};

// Add wins if correct guess/if fail no wins.
function winOrLose() {
    if (correctGuessCounter === randomWord.length) {
      document.getElementById('press-key').innerHTML = "You got it";
        alert("You Won");

        // If user correctly guesses entire word, add 1 point to wins.
         wins++;
        // Hook into html to udate number of wins (words guessed correctly).
        document.getElementById('win-counter').innerHTML = wins;

        clearAndReset();

    } else if (remainingGuesses === 0) {
        alert("You Lose");
        clearAndReset();
    }
}