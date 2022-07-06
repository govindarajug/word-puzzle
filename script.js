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

  isLastValid() {
    const last_index = this.#allGuessedWords.length - 1;
    return this.#allGuessedWords[last_index].isValid;
  }

  #isSolved() {
    return this.#validWords.length === this.correctGuesses().length;
  }

  #areChancesOver() {
    return this.#validWords.length + 2 <= this.#allGuessedWords.length;
  }

  isGameOver() {
    return this.#isSolved() || this.#areChancesOver();
  }
}

const highlightElement = (event) => {
  event.target.style['background-color'] = 'burlywood';
};

const removeHighlight = (element) => {
  element.style['background-color'] = 'antiquewhite';
};

const endPuzzle = () => {
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.onclick = null;
  }
  const submit = document.getElementById('submit');
  submit.onclick = null;
};

const showCorrectWords = (puzzle, listElement) => {
  if (!puzzle.isLastValid()) {
    return;
  };

  const listItem = document.createElement('li');
  const words = puzzle.correctGuesses();
  listItem.innerText = words[words.length - 1];
  listElement.appendChild(listItem);
};

const submitWord = (puzzle) => {
  puzzle.appendGuess();
  const listElement = document.getElementById('guesses');
  showCorrectWords(puzzle, listElement);
  if (puzzle.isGameOver()) {
    endPuzzle();
  }
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    removeHighlight(cell);
  }
};

const drawRowCells = (row, rowElement) => {
  row.forEach(cell => {
    const cellElement = document.createElement('div');
    cellElement.className = 'cell';
    cellElement.id = cell;
    cellElement.innerText = cell;
    rowElement.appendChild(cellElement);
  });
};

const drawPuzzle = (grid, gridElement) => {
  grid.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.className = 'row';
    gridElement.appendChild(rowElement);
    drawRowCells(row, rowElement);
  });
};

const addClickListenerTo = (elements, listener) => {
  for (const element of elements) {
    element.onclick = listener;
  }
};

const cellListener = (puzzle) => {
  return (event) => {
    puzzle.appendLetter(event.target.id);
    highlightElement(event);
  };
};

const puzzleController = (puzzle) => {
  const grid = [['z', 'b', 'p'], ['o', 'a', 'm'], ['o', 'd', 'c']];

  const gridElement = document.getElementById('grid');
  drawPuzzle(grid, gridElement);

  const cells = document.getElementsByClassName('cell');
  addClickListenerTo(cells, cellListener(puzzle));

  const submit = document.getElementById('submit');
  addClickListenerTo([submit], () => submitWord(puzzle));
};

const main = () => {
  const puzzle = new Puzzle(['zoo', 'bad', 'am']);
  puzzleController(puzzle);
};

window.onload = main;