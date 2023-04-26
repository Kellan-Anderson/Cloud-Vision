import { useRef, useState } from "react";

export default function ImageAnnotations({doc, url}) {
    const [[x, y], setCoords] = useState([0, 0]);
    const imageLoaded = x != 0 && y != 0;
    const parentDiv = useRef(null);
    const image = useRef(null);

    const vertices = doc.data().object_detection?.localizedObjectAnnotations?.[0]?.boundingPoly?.normalizedVertices;

    return <div className="relative flex w-3/5 h-3/5 mt-16">
    <div ref={parentDiv} className="relative w-full h-full">
      <img ref={image} onLoad={() => setCoords([image.current.width, image.current.height])} className="" src={url} alt={doc.id} />
      {imageLoaded ? (
        <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${x} ${y}`}>
          {/** see https://stackoverflow.com/questions/15500894/background-color-of-text-in-svg */}
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood flood-color="blue" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/** From all annotations, we need to get  */}
          {doc.data().object_detection?.localizedObjectAnnotations?.map((annotation, index) => {
            const normalized = normalize(annotation.boundingPoly.normalizedVertices, x, y);
            return (
              <>
                <text filter="url(#solid)" x={normalized[1].x} y={normalized[1].y} fill="blue" textAnchor="end" fontSize={x / 25}>
                  {annotation.name}
                </text>
                <path key={index} d={pathString(normalized)} fill="none" stroke="blue" strokeWidth="5" />
              </>
            );
          })}
        </svg>
      ) : <></>}
    </div>
  </div>
}

// convert normalized coordinates (0 to 1 representing percentage of full image) to a string representing
// M x y L x y L x y L x y... Z
// M: start path here.
// L: Line to here.
// Z: end path
// imageX, imageY are the width and height of the image the SVG is overlaying
function pathString(normalizedVertices, imageWidth, imageHeight) {
    return `M ${normalizedVertices.map(({x, y}) => `${x} ${y}`).join(" L ")} Z`;
}

function normalize(vertices, imageWidth, imageHeight) {
    return vertices.map((vertex) => {return {x: vertex.x * imageWidth, y: vertex.y * imageHeight}})
}
