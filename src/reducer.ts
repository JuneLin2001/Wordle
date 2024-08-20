// src/reducer.ts
type Action =
  | { type: 'ADD_GUESS'; guess: string }
  | { type: 'RESET' }
  | { type: 'SET_WORD'; word: string }
  | { type: 'SET_STATUS'; status: 'won' | 'lost' | 'playing' };

interface State {
  word: string;
  guesses: string[];
  status: 'won' | 'lost' | 'playing';
}

const initialState: State = {
  word: '', // 遊戲單詞
  guesses: [], // 已猜過的單詞
  status: 'playing', // 遊戲狀態
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_GUESS':
      return { ...state, guesses: [...state.guesses, action.guess] };
    case 'RESET':
      return initialState;
    case 'SET_WORD':
      return { ...state, word: action.word };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export { reducer, initialState };
