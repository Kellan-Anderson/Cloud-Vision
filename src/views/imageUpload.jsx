import react from "react"

import { getStorage, storageRef } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import ImageCard from "../components/ImageCard";
import SignIn from "../components/signin";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";

export  default function UploadImage(){

    const getFirebaseApp = useContext(FirebaseContext);
    const app = getFirebaseApp();
    const auth = getAuth(app);

    const storage = getStorage(app);

    const storageRef = storageRef(storage, "kjlsdghf");
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const ref = ref(storage, 'file.jpg');
}