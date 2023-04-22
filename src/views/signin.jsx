import React, { useEffect } from "react";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { useSignInWithGoogle, useSignInWithGithub } from "react-firebase-hooks/auth";
import FirebaseContext from "../context/firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const auth = getAuth(app);

  const [signInWithGithub, googleUser, googleLoading, googleError] = useSignInWithGithub(auth);
  const [signInWithGoogle, githubUser, githubLoading, githubError] = useSignInWithGoogle(auth);

  const navigateTo = useNavigate();

  useEffect(() => {
    if(auth.currentUser){
      console.log("first", auth.currentUser);
      navigateTo('/');
    }
  })

  useEffect(() => {
    if(auth.currentUser) navigateTo('/');
  }, [googleUser, githubUser]);

  const handleSignInGithub = () => {
    signInWithGithub();
    navigateTo("/");
  }
  const handleSignInGoogle = () => {
    signInWithGoogle();
    navigateTo("/");
  }

  return (
    <>
      <button onClick={handleSignInGoogle}>Sign In with Google</button>
      <button onClick={handleSignInGithub}>Sign In with Github</button>
    </>
  );
}
