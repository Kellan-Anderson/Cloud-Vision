import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";

// Create a context and export it for the child components to use
const FirebaseContext = createContext();
export default FirebaseContext;

/**
 * Context provider for the application, holds a universal reference to the firebase application
 * @param {*} children Children to render inside the context API
 * @returns 
 */
export function FirebaseProvider({children}) {
  // Reference to the firebase app
  const [_app, set_app] = useState(undefined);

  /**
   * Initializes a firebase app if one has not been already, returns a reference to the app
   * @returns A firebase app reference
   */
  const getFirebaseApp = () => {
    if(!_app) {
      // Init the app
      const initialized = initializeApp({
        apiKey: import.meta.env.VITE_APIKEY,
        authDomain: import.meta.env.VITE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_PROJECTID,
        storageBucket: import.meta.env.VITE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_APPID,
        measurementId: import.meta.env.VITE_MEASUREMENTID
      });
      // Set the app and return it
      set_app(initialized);
      return initialized;
    }
    // DELETE if code breaking
    return _app;
  }

  return (
    <FirebaseContext.Provider value={getFirebaseApp}>
      {children}
    </FirebaseContext.Provider>
  );
}
