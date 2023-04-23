import React, { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from '../components/Loading';

export default function Albums() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const auth = getAuth(app);
  const [authUser, loading, error] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, loading]);

  return (
    <>
    {loading ? <Loading /> : 
      <>
        {user ? 
        <>
          {/* Write album component here */}
        </> 
        : 
        <div className="flex flex-col justify-center items-center">
          <h1 className="mb-8">Please sign in to view this page</h1>
          <SignIn />
        </div>
        }
      </>
    }
    </>
  );
}