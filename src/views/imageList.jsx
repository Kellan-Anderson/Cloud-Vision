import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ImageCard from "../components/ImageCard";
import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

export default function ImageList() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authLoading, authUser]);
  
  
  const [v, firestoreLoading, firestoreError] = useCollection(
    collection(getFirestore(app), 'images')
  );
  const [value, setValue] = useState(v);
  useEffect(() => {
    setValue(v);
  }, [v, firestoreLoading]);

  return (
    <>
    {user ? 
      <> 
      { firestoreLoading || authLoading ? <Loading /> :
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
      } </>
      :
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-8">Please sign in to view this page</h1>
        <SignIn />
      </div>
    }
    </>
  );
}
