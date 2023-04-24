import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '../components/Loading';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// import {SignIn} from "../components/signin"

export default function Albums() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const storage = getStorage();
  const auth = getAuth(app);
  const [authUser, loading, error] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, loading]);

  const [urls, setUrls] = useState(null);

  let [result, firestoreLoading, firestoreError] = useCollection(
    user ? collection(getFirestore(app), user.uid) : null
  )
  if(result && urls === null) {
    Promise.all(result?.docs.map((doc) => getDownloadURL(ref(storage, doc.data().uri)))).then((urlArray) => {
      setUrls(urlArray);
    })
  }

  return (
    <>
      {loading ? <Loading /> :
        <>
          {user ?
            <div className="grid grid-cols-3">
              {urls ? urls.map((url, index) => <img draggable="true" className="bg-black m-8 w-64 h-64 object-scale-down transform hover:shadow-md hover:scale-110 transition-all duration-300" key={index} src={url}></img>) : <p></p>}
              {/* Write album component here */}
            </div>
            :
            <div className="flex flex-col justify-center items-center">
              <h1 className="mb-8">Please sign in to view this page</h1>
              {/*<SignIn />*/}
            </div>
          }
        </>
      }
    </>
  );
}