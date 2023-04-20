import { useState, useContext, useEffect } from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import FirebaseContext from './context/firebase';
import './App.css'
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const auth = getAuth(app);
  console.log(auth);

  const [user, userLoading, userError] = useAuthState(auth);

  useEffect(() => {
    if(!auth) {
      window.location.reload(false);
    }
  }, [user, auth]);

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), 'Testing')
  );

  const handleSignout = () => {
    signOut(auth);
  }

  if(!loading && !error) {
    console.log(value.docs);
  }

  return (
    <div>
      <section>
        {user ? <h1>{user.uid}</h1> : <h1>No user</h1>}
      </section>
      {value && 
        <div>
          <h1>Testing</h1>
          {value.docs.map(doc => <p key={doc.id}>{JSON.stringify(doc.data())}</p>)}
        </div>
      }
      {auth && <button onClick={handleSignout}>Sign out</button>}
    </div>
  );
}

export default App
