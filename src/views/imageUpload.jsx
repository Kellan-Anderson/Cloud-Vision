import React, {useEffect, useState} from "react"
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

import { getStorage, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import {useParams} from "react-router-dom";


export  default function ImageUpload(){
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();

  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  useEffect(() => {
    setUser(authUser);
  }, [authUser, authLoading]);

  let id = useParams();

  const storage = getStorage(app);
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile(); //initializes a file


  const [selectedFile, setSelectedFile] = useState(uploadFile); //allows the file to be set

  const upload = async () => {
    if (selectedFile) {
      //adds the user id and the name of the file to a storage path
      let storageRef = ref(storage, `${user.uid}` + "/" + selectedFile.name);
      const result = await uploadFile(storageRef, selectedFile, {
        contentType: 'image/jpeg'
      });
      alert(`Result: ${JSON.stringify(result)}`);
    }
  }

  return (
    <>
    {user ?
      <>
        <div>
          <p>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files ? e.target.files[0] : undefined;
                setSelectedFile(file);
              }}
            />
            <button onClick={upload}>Upload File</button>
          </p>
        </div>
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
'file.png
`${user.id}/file.png`
 */
