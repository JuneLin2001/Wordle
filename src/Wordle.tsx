import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer";

const Wordle: React.FC = () => {
  const guessWord = "meter";
  const guessWordArray = guessWord.toUpperCase().split("");

  const [state, dispatch] = useReducer(reducer, initialState);

  const setTargetWord = (word: string) => {
    dispatch({ type: 'SET_WORD', word });
  };

  useEffect(() => {
    setTargetWord(guessWord);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch({ type: "RESET" });
      } else if (
        e.key.length === 1 &&
        e.key.match(/[a-z]/i) &&
        state.guesses.length < 5
      ) {
        dispatch({ type: "ADD_GUESS", guess: e.key.toUpperCase() });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.guesses.length]);

  return (
    <>
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
      <div className="flex flex-wrap justify-center content-center w-screen h-96 outline-dashed">
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
                {guessWordArray[colIndex]}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
};

export default Wordle;
