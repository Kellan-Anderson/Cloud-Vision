import React, {useEffect, useState} from "react"
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";

import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";


export  default function ImageUpload(){
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, authLoading]);

  const storage = getStorage(app);
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile(); //initializes a file


  const [selectedFile, setSelectedFile] = useState(undefined); //allows the file to be set

  const [showUplaoded, setShowUploaded] = useState(false);

  const upload = async () => {
    if (selectedFile) {
      //adds the user id and the name of the file to a storage path
      let storageRef = ref(storage, `${user.uid}` + "/" + selectedFile.name);
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg'
      });
      setShowUploaded(!showUplaoded);
      console.log(selectedFile);
    }
  }

  return (
    <>
      {user ?
        <>
          { uploading ? <Loading /> :
            <>
              { showUplaoded ?
                <div className="flex flex-col justify-center items-center">
                  <h1 className="break-words text-center mb-10">{selectedFile.name} has been uploaded!</h1>
                  <button className="w-fit m-1" onClick={() => {
                    setShowUploaded(!showUplaoded);
                    setSelectedFile(undefined);
                  }}>
                    Upload another
                  </button>
                  <a className="button w-fit m-1" href='/images'>Go to images</a>
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                  <input
                    type="file"
                    className="file:button file:mr-4 border mb-4 p-2 rounded-lg border-blue-600"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : undefined;
                      setSelectedFile(file);
                    }}
                  />
                  <button 
                    className="disabled:opacity-25" 
                    onClick={upload} 
                    disabled={selectedFile === undefined}
                  >
                    Upload File
                  </button>
                </div>
                
              }
            </>
          }
        </>
      :
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-8">Please sign in to view this page</h1>
        <SignIn />
      </div>
      }
    </>
  );
}

/*
user
  loading
    showuploaded
 */
