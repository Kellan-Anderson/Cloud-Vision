import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc } from "firebase/firestore";
import FirebaseContext from "../context/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../components/signin";
import ImageAnnotations from "../components/ImageAnnotations";

export default function ImagePage() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const auth = getAuth(app);
  const { id } = useParams();

  // Auth
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [user, setUser] = useState(authUser);
  const [userId, setUserId] = useState('dummy-do-not-delete');
  useEffect(() => {
    setUser(authUser);
    setUserId(authUser !== null ? authUser.uid : userId);
  }, [authLoading, authUser]);

  // Firestore
  const [val, loading, error] = useDocument(doc(getFirestore(app), userId, id));
  const [image, setImage] = useState(val);
  useEffect(() => {
    setImage(val)
  }, [val]);
              
  let path, filename;
  let labels = [];
  let url = '';
  if(image) {
    const data = image.data();
    labels = data.label_detection.labelAnnotations;
    [path, filename] = data.uri.split("/");
    url = `https://firebasestorage.googleapis.com/v0/b/vision-media-b5556.appspot.com/o/${path}%2F${filename}?alt=media`;
  }

  return (
    <>
    {user ? 
      <div className="flex flex-col justify-center items-center w-full">
        {loading ? <Loading /> : 
          <>
            <ImageAnnotations url={url} doc={val}></ImageAnnotations>
            <h1 className="mt-7 mb-10">{filename}</h1>
            <section className="px-20 mb-6 w-full">
              <div 
                id="image-description" 
                className="flex flex-col justify-center bg-neutral-950 rounded-xl"
              >
                {labels.map((label) => {
                  const width = (label.score * 100).toFixed(3);
                  return (
                    <div className="h-12 my-2 mx-3 bg-gray-700 rounded-lg first:mt-4 last:mb-4">
                      <div 
                        className="flex items-center justify-between h-full px-2 bg-blue-700 
                        rounded-xl" 
                        style={{width: `${width}%`}}
                        >
                        <h2>{label.description}</h2>
                        <h2>{width}%</h2>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </>
        }
      </div>
      :
      <div className="flex flex-col justify-center items-center">
        <h1 className="mb-8">Please sign in to view this page</h1>
        <SignIn />
      </div>
    }
    </>
  );
}
