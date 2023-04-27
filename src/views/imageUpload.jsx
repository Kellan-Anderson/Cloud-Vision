import React, {useEffect, useState} from "react"
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";

import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";

/**
 * Image upload page
 * @returns Image upload component
 */
export  default function ImageUpload(){
  // Get the reference to the Firebase app
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  // Get a reference to the users auth instance and update the page whenever it changes
  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, authLoading]);

  // Get references to the cloud storage
  const storage = getStorage(app);
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();

  // Inits the file to be undefined
  const [selectedFile, setSelectedFile] = useState(undefined);

  // Used to know whether or not to show if the image has been uploaded
  const [showUplaoded, setShowUploaded] = useState(false);

  // Function to upload a file to the storage bucket
  const upload = async () => {
    if (selectedFile) {
      //adds the user id and the name of the file to a storage path
      let storageRef = ref(storage, `${user.uid}` + "/" + selectedFile.name);
      // Upload the file and get the result
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg'
      });
      // Set the screen to show that an image has been uploaded
      setShowUploaded(!showUplaoded);
    }
  }

  return (
    <>
      {/* Check that a user has been logged in */}
      {user ?
        <>
          {/* Check that an image is not currently uploading */}
          { uploading ? <Loading /> :
            <>
              {/* Check which screen to show */}
              { showUplaoded ?
                <div className="flex flex-col justify-center items-center">
                  {/* Title for the uploaded screen */}
                  <h1 className="break-words text-center mb-10">
                    {selectedFile.name} has been uploaded!
                  </h1>
                  {/* Upload another image button */}
                  <button className="w-fit m-1" onClick={() => {
                    setShowUploaded(!showUplaoded);
                    setSelectedFile(undefined);
                  }}>
                    Upload another
                  </button>
                  {/* Go to images button */}
                  <a className="button w-fit m-1" href='/images'>Go to images</a>
                </div>
                :
                <div className="flex flex-col justify-center items-center">
                  {/* Gets the file */}
                  <input
                    type="file"
                    className="file:button file:mr-4 border mb-4 p-2 rounded-lg border-blue-600"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : undefined;
                      setSelectedFile(file);
                    }}
                  />
                  {/* disables the button if a file has not been chosen */}
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
