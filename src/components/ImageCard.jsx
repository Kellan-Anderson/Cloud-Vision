import React from "react";

export default function ImageCard({ imageDoc }) {
  const imageName = imageDoc.id;
  const url = 'https://firebasestorage.googleapis.com/v0/b/vision-media-b5556.appspot.com/o/' + 
              `${imageName}?alt=media`;
  const data = imageDoc.data();
  const labels = data.labelAnnotations;

  return (
    <div 
      className="border-stone-950 border-2 flex flex-col justify-center items-center w-72 m-6 px-3 
                  py-3 rounded-xl bg-stone-800 justify-self-center"
    >
      <img src={url} alt={"hello world"} className="h-48 w-fit"/>
      <h2 id="card-title" className="break-words text-center my-1 font-semibold">{imageName}</h2>
      <div id="tags" className="flex flex-wrap">
        {labels.map((label) => 
          <p key={label.mid} className="label-tag">{label.description}</p>
        )}
      </div>
    </div>
  );
}