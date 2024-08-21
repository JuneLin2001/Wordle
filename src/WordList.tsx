import React, { useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const WordList: React.FC = () => {
  console.log([
    import.meta.env.VITE_FIREBASE_API_KEY,
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    import.meta.env.VITE_FIREBASE_PROJECT_ID,
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    import.meta.env.VITE_FIREBASE_APP_ID,
  ]);

  useEffect(() => {
    getDocs(collection(db, "words"))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);

  return (
    <>
      <h1>WordList</h1>
      <ul></ul>
    </>
  );
};

export default WordList;
