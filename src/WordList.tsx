import React, { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const WordList: React.FC = () => {
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "words"));
        const wordList: string[] = [];
        querySnapshot.forEach((doc) => {
          const word = doc.data().answer;
          if (word) {
            wordList.push(word);
          }
        });
        console.log("Fetched words:", wordList); // 在這裡進行所需操作
      } catch (error) {
        console.error("Error fetching words: ", error);
      }
    };

    fetchWords();
  }, []);

  return null; // 不渲染任何內容
};

export default WordList;
