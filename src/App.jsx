import { useState, useContext, useEffect } from 'react'
import FirebaseContext from './context/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './components/signin';
import { useNavigate } from 'react-router-dom';

function App() {

  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const [authUser, loading, error] = useAuthState(auth);

  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, loading]);

  const navigateTo = useNavigate();

  return (
    <div className='flex flex-col justify-center items-center'>
    {user ? 
      <>
        <h1 className='mb-8'>Hello {user.displayName.split(" ")[0]}!</h1>
        <div className='flex flex-col'>
          <button className='btn-primary' onClick={() => {}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 640 512">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 
                       96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 
                       138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 
                       34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 
                       9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 
                       24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 
                       0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
              />
            </svg>
            Upload image
          </button>
          <button className='btn-primary' onClick={() => navigateTo("images")}>
            <svg xmlns="http://www.w3.org/2000/svg" className='icon' viewBox="0 0 576 512">
              <path d="M160 80H512c8.8 0 16 7.2 16 16V320c0 8.8-7.2 16-16 16H490.8L388.1 
                       178.9c-4.4-6.8-12-10.9-20.1-10.9s-15.7 4.1-20.1 10.9l-52.2 
                       79.8-12.4-16.9c-4.5-6.2-11.7-9.8-19.4-9.8s-14.8 3.6-19.4 9.8L175.6 
                       336H160c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16zM96 96V320c0 35.3 28.7 64 
                       64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H160c-35.3 0-64 28.7-64 
                       64zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120V344c0 75.1 60.9 136 136 
                       136H456c13.3 0 24-10.7 24-24s-10.7-24-24-24H136c-48.6 
                       0-88-39.4-88-88V120zm208 24a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/>
            </svg>
            View images
          </button>
          <button className='btn-primary' onClick={() => auth.signOut()}>Sign out</button>
        </div> 
      </>
      : 
      <>
        <h1 className='mb-8'>Welcome to Vision Media!</h1>
        <SignIn />
      </>
    }
    </div>
  );
}

export default App
