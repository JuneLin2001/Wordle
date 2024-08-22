import { useReducer, useEffect } from "react";
import { reducer, initialState } from "./reducer";
import { fetchWords } from "./WordList";

const Wordle: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(import.meta.env.VITE_FIREBASE_API_KEY);
    async function getSolution() {
      const solutionFromDb = await fetchWords();
      const randomIndex = Math.floor(Math.random() * solutionFromDb.length);
      const selectedAnswer = solutionFromDb[randomIndex];
      if (!import.meta.env.VITE_FIREBASE_API_KEY) {
        const answerDatabase = ["DELAY", "CATCH", "SLEEP", "SOLVE", "SPLIT"];
        const randomIndex = Math.floor(Math.random() * answerDatabase.length);
        const selectedAnswer = answerDatabase[randomIndex];
        dispatch({ type: "SET_WORD", word: selectedAnswer });
      } else if (solutionFromDb) {
        dispatch({ type: "SET_WORD", word: selectedAnswer });
        console.log(selectedAnswer);
      }
    }
    return () => {
      getSolution();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        dispatch({ type: "DELETE_GUESS" });
      } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        dispatch({ type: "ADD_GUESS", guess: e.key.toUpperCase() });
      } else if (e.key === "Enter") {
        dispatch({ type: "SUBMIT_GUESS" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (state.isCorrect) {
      setTimeout(() => {
        alert("Correct");
        dispatch({ type: "RESET" });
      }, 100);
    } else if (state.guessedWords.length === 6) {
      setTimeout(() => {
        alert("Game Over");
        dispatch({ type: "RESET" });
      }, 100);
    }
  }, [state.guessedWords.length, state.isCorrect]);

  return (
    <div className="flex flex-row flex-wrap justify-center content-center w-screen h-96 outline-dashed">
      {Array.from({ length: 6 }).map((_, rowIndex) => (
        <ul
          key={rowIndex}
          className="flex justify-center items-center mx-auto w-full gap-1 mb-1 "
        >
          {Array.from({ length: 5 }).map((_, colIndex) => {
            const guessedWord = state.guessedWords[rowIndex];
            const displayValue =
              guessedWord?.guess[colIndex] ||
              (rowIndex === state.guessedWords.length
                ? state.guesses[colIndex] || ""
                : "");

            const color = guessedWord?.colors[colIndex] || "transparent";
            const bgColor =
              color === "green"
                ? "bg-green-500"
                : color === "yellow"
                ? "bg-yellow-500"
                : color === "gray"
                ? "bg-gray-300"
                : "bg-white";

            return (
              <li
                key={colIndex}
                className={`w-12 h-12 border-2 border-gray-300 text-black text-center content-center text-4xl ${bgColor}`}
              >
                {displayValue}
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
};

export default Wordle;
