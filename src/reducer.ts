const answerDatabase = ["DELAY", "CATCH", "SLEEP", "SOLVE", "SPLIT"];

type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" }
  | { type: "SET_WORD"; word: string };

interface State {
  word: string;
  guesses: string[];
  guessedWords: { guess: string; colors: string[] }[];
  isCorrect: boolean;
}

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * answerDatabase.length);
  return answerDatabase[randomIndex];
}

const initialState: State = {
  word: getRandomWord(),
  guesses: [],
  guessedWords: [],
  isCorrect: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_GUESS":
      if (state.guesses.length < 5) {
        return { ...state, guesses: [...state.guesses, action.guess] };
      }
      return state;

    case "DELETE_GUESS":
      return { ...state, guesses: state.guesses.slice(0, -1) };

    case "SUBMIT_GUESS": {
      const wordLength = 5;
      const currentGuess = state.guesses.slice(-wordLength).join("");
      const isCorrect = currentGuess === state.word;

      const colors = Array(wordLength).fill("gray");
      const wordArray = state.word.split("");
      const guessArray = currentGuess.split("");

      guessArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          colors[index] = "green";
          // wordArray[index] = '';
        } else if (colors[index] !== "green" && wordArray.includes(letter)) {
          colors[index] = "yellow";
          // wordArray[wordArray.indexOf(letter)] = "";
        } else {
          colors[index] = "gray";
        }
      });
      if (currentGuess.length === wordLength) {
        return {
          ...state,
          guessedWords: [
            ...state.guessedWords,
            { guess: currentGuess, colors },
          ],
          guesses: [],
          isCorrect,
        };
      }
      return state;
    }

    case "RESET":
      return {
        ...initialState,
        word: getRandomWord(),
      };
    default:
      return state;
  }
};

export { reducer, initialState };
