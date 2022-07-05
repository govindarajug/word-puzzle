class Puzzle {
  #validWords;
  #guessedWord;
  #allGuessedWords;
  constructor(validWords) {
    this.#validWords = validWords;
    this.#guessedWord = '';
    this.#allGuessedWords = [];
  }

  appendLetter(letter) {
    this.#guessedWord += letter;
    console.log(this.#guessedWord);
  }

  isValidWord() {
    return this.#validWords.includes(this.#guessedWord);
  }

  appendGuess() {
    this.#allGuessedWords.push({
      word: this.#guessedWord,
      isValid: this.isValidWord()
    });
    console.log(this.#allGuessedWords);
    this.#guessedWord = '';
  }

  correctGuesses() {
    return this.#allGuessedWords.reduce((validGuesses, guess) => {
      if (guess.isValid) {
        validGuesses.push(guess.word);
      };
      return validGuesses;
    }, []);
  }

  isSolved() {
    return this.#validWords.length === this.correctGuesses().length;
  }
}

const highlightElement = (event) => {
  event.target.style['background-color'] = 'burlywood';
};

const endPuzzle = () => {
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.removeEventListener('click', highlightElement);
  }
};

const submitWord = (puzzle) => {
  puzzle.appendGuess();
  if (puzzle.isSolved()) {
    endPuzzle();
  }
};

const addClickListenerTo = (elements, listener) => {
  for (const element of elements) {
    element.addEventListener('click', listener);
  }
};

const main = () => {
  const puzzle = new Puzzle(['zoo', 'bad', 'am']);

  const cells = document.getElementsByClassName('cell');
  addClickListenerTo(cells, (event) => puzzle.appendLetter(event.target.id));
  addClickListenerTo(cells, highlightElement);

  const done = document.getElementById('done');
  addClickListenerTo([done], (event) => submitWord(puzzle));
};

window.onload = main;