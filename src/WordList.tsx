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
    console.log(wordList);

    return wordList;
  }
  return [];
}
