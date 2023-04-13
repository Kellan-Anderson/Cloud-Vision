import { useState, useContext } from 'react'
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import FirebaseContext from './context/firebase';
import './App.css'

function App() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const [value, loading, error] = useCollection(
    collection(getFirestore(app), 'Testing')
  );

  if(!loading && !error) {
    console.log(value.docs);
  }

  return (
    <div>
      {value && 
        <div>
          <h1>Testing</h1>
          {value.docs.map(doc => <p key={doc.id}>{JSON.stringify(doc.data())}</p>)}
        </div>
      }
    </div>
  );
}

export default App
