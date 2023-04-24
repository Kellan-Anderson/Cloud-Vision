import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '../components/Loading';
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

// import {SignIn} from "../components/signin"

export default function Albums() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const db = getFirestore(app);

  const auth = getAuth(app);
  const [authUser, loading, error] = useAuthState(auth);
  const [user, setUser] = useState(authUser);

  useEffect(() => {
    setUser(authUser);
  }, [authUser, loading]);

  let [result, firestoreLoading, firestoreError] = useCollection(
    user ? collection(getFirestore(app), user.uid) : null
  )

  return (
    <>
      {loading ? <Loading /> :
        <>
          {user ?
            <>
              {result?.docs.map((doc) => <p key={doc.id}>{doc.data().uri}</p> )}
              {/* Write album component here */}
            </>
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