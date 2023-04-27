import React, { useEffect, useState, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ImageCard from "../components/ImageCard";
import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

/**
 * Lists all the uploaded images on a page
 * @returns Image list component
 */
export default function ImageList() {
  // Get a reference to the firebase app
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  // Get an auth instance and reset it upon any changes
  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  const [userId, setUserId] = useState('dummy-do-not-delete');
  useEffect(() => {
    setUser(authUser);
    setUserId(authUser !== null ? authUser.uid : userId);
  }, [authLoading, authUser]);
  
  // Get images from the firestore and assign the data to a variable. Resets the variable upon auth
  // change
  const [v, firestoreLoading, firestoreError] = useCollection(collection(getFirestore(app), userId))
  const [value, setValue] = useState(undefined);
  useEffect(() => {
    setValue(v);
  }, [v, firestoreLoading, user]);

  return (
    <>
    {user ? 
      <> 
      {/* display a loading component while the images are loading */}
      { firestoreLoading || authLoading ? <Loading /> :
        <div>
          <h1 className="w-full font-semibold text-4xl md:text-8xl mb-12 mt-24 mx-0 text-center">
            UPLOADED IMAGES
          </h1>
          <div className="w-full md:px-8">
            <div className="flex flex-row flex-wrap justify-center w-full">
              {/* Map over all the images in the firestore and display them in a card component */}
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
