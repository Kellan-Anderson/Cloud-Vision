import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";

const FirebaseContext = createContext();
export default FirebaseContext;

export function FirebaseProvider({children}) {
  const [_app, set_app] = useState(undefined);

  const getFirebaseApp = () => {
    if(!_app) {
      const initialized = initializeApp({
        apiKey: import.meta.env.VITE_APIKEY,
        authDomain: import.meta.env.VITE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_PROJECTID,
        storageBucket: import.meta.env.VITE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_APPID,
        measurementId: import.meta.env.VITE_MEASUREMENTID
      });
      set_app(initialized);
      return initialized;
    }
  }

  return (
    <FirebaseContext.Provider value={getFirebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
}
