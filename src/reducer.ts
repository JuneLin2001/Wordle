type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" };


interface State {
  word: string;
  guesses: string[];
  guessedWords: string[];
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
      return { ...state, guesses: [...state.guesses, action.guess] };
    case "DELETE_GUESS":
      return { ...state, guesses: state.guesses.slice(0, -1) };
    case "SUBMIT_GUESS": {
      const guessLength = 5;
      const currentGuess = state.guesses.slice(-guessLength).join("");
      const isCorrect = currentGuess === state.word;
      console.log(currentGuess);
      console.log("已經猜了" + (state.guessedWords.length + 1) + "次");
      return {
        ...state,
        guessedWords: [...state.guessedWords, currentGuess],
        guesses: [],
        isCorrect,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export { reducer, initialState };
