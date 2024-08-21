import React, { useReducer, useEffect } from "react";

// 定義 action 的型別
type Action =
  | { type: "ADD_GUESS"; guess: string }
  | { type: "DELETE_GUESS" }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" }
  | { type: "SET_WORD"; word: string };

// 定義 reducer 函數
interface State {
  word: string;
  guesses: string[];
  guessedWords: { guess: string; colors: string[] }[];
  isCorrect: boolean;
}

const initialState: State = {
  word: "APPLE", // 預設為示例單詞
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
        } else if (colors[index] !== "green" && wordArray.includes(letter)) {
          colors[index] = "yellow";
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
      return initialState;

    default:
      return state;
  }
};

const Wordle: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.isCorrect) {
      setTimeout(() => {
        alert("Correct");
        dispatch({ type: "RESET" });
      }, 1000);
    } else if (state.guessedWords.length === 6) {
      setTimeout(() => {
        alert("Game Over");
        dispatch({ type: "RESET" });
      }, 1000);
    }
  }, [state.isCorrect, state.guessedWords]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.toUpperCase();

    if (key.length === 1 && /^[A-Z]$/.test(key)) {
      dispatch({ type: "ADD_GUESS", guess: key });
    } else if (key === "Backspace") {
      dispatch({ type: "DELETE_GUESS" });
    } else if (key === "Enter") {
      dispatch({ type: "SUBMIT_GUESS" });
    }
  };

  return (
    <div
      className="flex flex-wrap justify-center content-center w-screen h-96 outline-dashed"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h1>Wordle</h1>
      {state.guessedWords.map((wordObj, rowIndex) => (
        <ul
          key={rowIndex}
          className="flex justify-center items-center mx-auto w-full gap-1 mb-1"
        >
          {wordObj.guess.split("").map((letter, colIndex) => (
            <li
              key={colIndex}
              className={`w-12 h-12 border-2 border-black text-center content-center text-4xl ${wordObj.colors[colIndex]}`}
            >
              {letter}
            </li>
          ))}
        </ul>
      ))}
      <ul className="flex justify-center items-center mx-auto w-full gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, colIndex) => (
          <li
            key={colIndex}
            className="w-12 h-12 border-2 border-black text-center content-center text-4xl"
          >
            {state.guesses[colIndex] || ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wordle;
