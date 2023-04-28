import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React, { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { deleteObject, getStorage, ref } from "firebase/storage";


export default function ImageCard({ imageDoc }) {
  const data = imageDoc.data();
  const [path, filename] = data.uri.split("/");
  const labels = data.labelAnnotations;
  const url = `https://firebasestorage.googleapis.com/v0/b/vision-media-b5556.appspot.com/o/${path}%2F${filename}?alt=media`
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const storage = getStorage(app);

  const auth = getAuth(app);
  const [authUser, authLoading, authError] = useAuthState(auth);

  const firestore = getFirestore(app);

  return (
    <div className="border-stone-950 border-2 flex flex-col justify-center items-center w-72 m-6 px-3 
    py-3 rounded-xl bg-stone-800 justify-self-center hover:shadow-md hover:scale-110 transition-all duration-200">
      <a
        href={`/images/${imageDoc.id}`} 
        
        >
        <img src={url} alt={filename} className="h-48 w-fit"/>
        <h2 id="card-title" className="break-words text-center w-full my-1 font-semibold">{filename}</h2>
        <div id="tags" className="flex flex-wrap">
          {labels.map((label) => 
            <p key={label.mid} className="label-tag">{label.description}</p>
            )}
        </div>
      </a>
      <button className="bg-red-600" onClick={() => {
        if(authUser) {
          const reff = ref(storage, imageDoc.data().uri);
          deleteObject(reff);
          deleteDoc(doc(firestore, `${authUser.uid}/${imageDoc.id}`));
        }
      }}>delete</button>
    </div>
  );
}