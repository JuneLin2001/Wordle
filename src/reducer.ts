type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" }
  | { type: "SET_WORD"; word: string }
  | { type: "SET_STATUS"; status: "won" | "lost" | "playing" };

interface State {
  word: string;
  guesses: string[];
  guessedWords: { guess: string; colors: string[] }[];
  status: "won" | "lost" | "playing";
}

const initialState: State = {
  word: "",
  guesses: [],
  guessedWords: [],
  status: "playing",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_GUESS":
      if (state.guesses.length < 5) {
        return { ...state, guesses: [...state.guesses, action.guess] };
      }
      return { ...state };

    case "DELETE_GUESS":
      return { ...state, guesses: state.guesses.slice(0, -1) };

    case "SUBMIT_GUESS": {
      const wordLength = 5;
      const currentGuess = state.guesses.slice(-wordLength).join("");
      const colors = Array(wordLength).fill("gray");
      const wordArray = state.word.split("");
      const guessArray = currentGuess.split("");

      guessArray.forEach((letter, index) => {
        if (letter === wordArray[index]) {
          colors[index] = "green";
        } else if (colors[index] !== "green" && wordArray.includes(letter)) {
          colors[index] = "yellow";
        } else {
          colors[index] = "gray";
        }
      });

      let status = state.status;
      if (currentGuess.length === wordLength) {
        const isCorrect = currentGuess === state.word;
        status = isCorrect
          ? "won"
          : state.guessedWords.length + 1 >= 6
          ? "lost"
          : "playing";

        return {
          ...state,
          guessedWords: [
            ...state.guessedWords,
            { guess: currentGuess, colors },
          ],
          guesses: [],
          status,
        };
      }

      return { ...state };
    }
    case "RESET":
      return {
        ...initialState,
      };
    case "SET_WORD":
      return { ...state, word: action.word };
    case "SET_STATUS":
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export { reducer, initialState };
