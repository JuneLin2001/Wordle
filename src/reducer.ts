type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" };

interface State {
  word: string;
  guesses: string[];
  guessedWords: { guess: string; colors: string[] }[];
  isCorrect: boolean;
}

const initialState: State = {
  word: "DELAY",
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

      // Generate color codes for the guess
      const colors = Array(5).fill("gray"); // Default color for letters
      const wordArray = state.word.split("");
      const guessArray = currentGuess.split("");

      // Mark correct positions
      guessArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          colors[index] = "green";
          // wordArray[index] = ''; // Avoid marking the same letter again
        }
      });

      // Mark incorrect positions but correct letters
      guessArray.forEach((letter, index) => {
        if (colors[index] !== "green" && wordArray.includes(letter)) {
          colors[index] = "yellow";
          // wordArray[wordArray.indexOf(letter)] = ''; // Avoid marking the same letter again
        }
      });

      if (currentGuess.length === 5) {
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
      return initialState;

    default:
      return state;
  }
};

export { reducer, initialState };
