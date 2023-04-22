import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ImageCard from "../components/ImageCard";

export default function ImageList() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const auth = getAuth(app);

  const [v, loading, error] = useCollection(collection(getFirestore(app), 'images'));

  const [value, setValue] = useState(v);
  useEffect(() => {
    setValue(v);
  }, [v, loading, error]);

  return (
    <>
    {auth ? 
      <div>
        <h1 className="font-semibold text-4xl md:text-8xl mb-12 mt-24 text-center">
          UPLOADED IMAGES
        </h1>
        <div className="w-full px-8">
          <div className="flex flex-row flex-wrap justify-center w-full">
            <>
              {value?.docs.map((doc) => <ImageCard key={doc.id} imageDoc={doc}/> )}
            </>
          </div>
        </div>
      </div>
      :
      <h1>{/* User not logged in */}</h1>
    }
    </>
  );
}
