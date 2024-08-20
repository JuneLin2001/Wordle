import { useReducer, useEffect, useRef } from "react";
import { reducer, initialState } from "./reducer";

const Wordle: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const guessesLengthRef = useRef<number>(0);

  //   const guessWordArray = guessWord.toUpperCase().split("");

  //   const setTargetWord = (word: string) => {
  //     dispatch({ type: 'SET_WORD', word });
  //   };

  useEffect(() => {
    guessesLengthRef.current = state.guesses.length;
  }, [state.guesses]);

  useEffect(() => {
    // const guessWord = "METRO";
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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-row flex-wrap justify-center content-center w-screen h-96 outline-dashed">
      <h1>Wordle</h1>
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <ul
          key={rowIndex}
          className="flex justify-center items-center mx-auto w-full gap-1 mb-1"
        >
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <li
              key={colIndex}
              className="w-12 h-12 border-2 border-black text-center content-center text-4xl"
            >
              {state.guesses[rowIndex * 5 + colIndex] || ""}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default Wordle;
