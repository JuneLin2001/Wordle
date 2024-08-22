// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

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
    console.log("Answer is:", selectedSolution);

    return selectedSolution;
  }
  return;
}
