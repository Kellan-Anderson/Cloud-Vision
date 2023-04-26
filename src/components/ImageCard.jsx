import React from "react";

export default function ImageCard({ imageDoc }) {
  console.log(imageDoc);
  const data = imageDoc.data();
  const [path, filename] = data.uri.split("/");
  const labels = data.label_detection.labelAnnotations;
  const url = `https://firebasestorage.googleapis.com/v0/b/vision-media-b5556.appspot.com/o/${path}%2F${filename}?alt=media`

  return (
    <a
      href={`/images/${imageDoc.id}`} 
      className="border-stone-950 border-2 flex flex-col justify-center items-center w-72 m-6 px-3 
                  py-3 rounded-xl bg-stone-800 justify-self-center hover:shadow-md hover:scale-110 transition-all duration-200"
    >
      <img src={url} alt={filename} className="h-48 w-fit"/>
      <h2 id="card-title" className="break-words text-center my-1 font-semibold">{filename}</h2>
      <div id="tags" className="flex flex-wrap">
        {labels.map((label) => 
          <p key={label.mid} className="label-tag">{label.description}</p>
        )}
      </div>
    </a>
  );
}