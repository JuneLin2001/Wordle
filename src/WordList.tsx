import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchWords() {
  const querySnapshot = await getDocs(collection(db, "words"));

  if (!querySnapshot.empty) {
    const wordList: string[] = [];
    querySnapshot.forEach((doc) => {
      const word = doc.data().answer;
      if (word) {
        wordList.push(word);
      }
    });
    const randomIndex = Math.floor(Math.random() * wordList.length);
    const selectedSolution = wordList[randomIndex];
    console.log(wordList);
    console.log("Selected solution:", selectedSolution);

    return selectedSolution;
  }
  return;
}
