import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, doc } from "firebase/firestore";
import FirebaseContext from "../context/firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Loading from "../components/Loading";

export default function ImagePage() {
  const getFirebaseApp = useContext(FirebaseContext);
  const app = getFirebaseApp();
  const auth = getAuth(app);
  let { id } = useParams();

  id = 'MP7_Mario.png';

  const [val, loading, error] = useDocument(doc(
    getFirestore(app),
    'images',
    id
  ));

  const [image, setImage] = useState(val);
  useEffect(() => {
    setImage(val)
  }, [val]);

  const url = `https://firebasestorage.googleapis.com/v0/b/vision-media-b5556.appspot.com/o/${id}?alt=media`;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      {loading ? <Loading /> : 
        <>
          <img className="h-96 w-fit mt-10" src={url} alt={id} />
          <h1 className="mt-7 mb-10">{id}</h1>
          <section className="px-20 mb-6 w-full">
            <div id="image-description" className="flex flex-col justify-center bg-neutral-950 rounded-xl">
              {image?.data().labelAnnotations.map((label) => {
                const width = (label.score * 100).toFixed(3);
                return (
                  <div className="h-12 my-2 mx-3 bg-gray-700 rounded-lg first:mt-4 last:mb-4">
                    <div className="flex items-center justify-between h-full px-2 bg-blue-700 rounded-xl" style={{width: `${width}%`}}>
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
  );
}
