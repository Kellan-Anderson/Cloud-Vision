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

  const handleSignInGithub = () => {
    signInWithGithub();
    navigateTo("/");
  }

  const handleSignInGoogle = () => {
    signInWithGoogle();
    navigateTo("/");
  }

  return (
    <div className="flex flex-col">
      <button className="btn-sign-in" onClick={handleSignInGoogle}>
        <svg 
          className="h-5 w-5 mr-2" 
          viewBox="0 0 21 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
    			<g>
    				<path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 
                     8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 
                     15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" 
                  fill="#3F83F8">
            </path>
    				<path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 
                     15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 
                     14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 
                     20.0006V20.0006Z" 
                  fill="#34A853">
            </path>
    				<path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 
                     8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 
                     14.4927L5.08857 11.9169V11.9169Z" 
                  fill="#FBBC04">
            </path>
    				<path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 
                     2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 
                     0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 
                     8.09302 3.95805 10.7019 3.95805V3.95805Z" 
                  fill="#EA4335">
            </path>
    			</g>
    		</svg>
        Sign In with Google
      </button>

      <button className="btn-sign-in" onClick={handleSignInGithub}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 
                   11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
                   1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 
                   3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 
                   0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 
                   1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 
                   3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 
                   0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 
                   .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 
                   0-6.627-5.373-12-12-12z"
          />
        </svg>
        Sign In with Github
      </button>
    </div>
  );
}
