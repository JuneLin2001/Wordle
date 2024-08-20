// src/reducer.ts
type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
//   | { type: "SUBMIT_GUESS" }
//   | { type: "RESET" }
//   | { type: "SET_WORD"; word: string };


interface State {
  word: string;
  guesses: string[];
}

const initialState: State = {
  word: "", 
  guesses: [], 
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_GUESS":
      return { ...state, guesses: [...state.guesses, action.guess] };
    case "DELETE_GUESS":
      return { ...state, guesses: state.guesses.slice(0, -1) };
    // case "RESET":
    //   return initialState;
    // case "SET_WORD":
    //   return { ...state, word: action.word };
    default:
      return state;
  }
};

export { reducer, initialState };
