import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState } from "./reducer";

const Wordle: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const guessesLengthRef = useRef<number>(0);

  useEffect(() => {
    guessesLengthRef.current = state.guesses.length;
  }, [state.guesses]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentGuessesLength = guessesLengthRef.current;
      if (e.key === "Backspace") {
        dispatch({ type: "DELETE_GUESS" });
      } else if (
        e.key.length === 1 &&
        e.key.match(/[a-z]/i) &&
        currentGuessesLength < 5
      ) {
        dispatch({ type: "ADD_GUESS", guess: e.key.toUpperCase() });
        console.log(currentGuessesLength)
      }
      else if (e.key === "Enter") {
        if(currentGuessesLength === 5){
          dispatch({ type: "SUBMIT_GUESS" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (state.isCorrect) {
      alert("Correct");
      dispatch({ type: "RESET" });
    }
    else if(state.guessedWords.length === 6){
      alert("Game Over");
      dispatch({ type: "RESET" });
    }
  }, [state.guessedWords.length, state.isCorrect]); 

  return (
    <div className="flex flex-row flex-wrap justify-center content-center w-screen h-96 outline-dashed">
      <h1>Wordle</h1>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <ul
          key={rowIndex}
          className="flex justify-center items-center mx-auto w-full gap-1 mb-1"
        >
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const index = rowIndex * 5 + colIndex;
            let displayValue = "";

            if (index < state.guessedWords.length * 5) {
              displayValue = state.guessedWords[rowIndex][colIndex] || "";
            } else if (rowIndex === state.guessedWords.length && colIndex < state.guesses.length) {
              displayValue = state.guesses[colIndex] || "";
            }

            return (
              <li
                key={colIndex}
                className={`w-12 h-12 border-2 border-black text-center content-center text-4xl ${
                  rowIndex < state.guessedWords.length ? 'bg-gray-200' : ''
                }`}
              >
                {displayValue}
              </li>
            );
          })}
        </ul>
      ))}
      <h2>Answer is {state.word}</h2>
    </div>
  );
};


export default Wordle;
