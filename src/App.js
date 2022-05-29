import React from "react";
import "./App.css";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
// import { toGeoJSON } from "@mapbox/toGeoJSON"
import { readFile } from 'fs'
// import testGPX from ".//assets/Saturday Option .gpx"
const togeojson = require("@tmcw/togeojson") // require("togeojson"); tmcw is maintained?

const DomParser = require("xmldom").DOMParser; // node doesn't have xml parsing or a dom.

// generate a geojson for a route
const fileParsedFromDom = new DomParser().parseFromString(
    // testGPX
    readFile(".//assets/Saturday Option .gpx", { encoding: "UTF-8" })
);

// Convert GPX to GeoJSON
console.log(fileParsedFromDom)
const geojson = togeojson.gpx(fileParsedFromDom);

// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
//     ]
//   };
  
const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
        'circle-radius': 10,
        'circle-color': '#007cbf'
    }
    };


// Map with react map & Mapbox
// https://visgl.github.io/react-map-gl/docs/get-started/get-started
function App() {
    const [viewState, setViewState] = useState({
      latitude: 54.9783,
      longitude: -1.6178,
        zoom: 10,
    });

    return (
        <div className='App'>
            {/* <div>{testGPX}</div> */}
            <div>{fileParsedFromDom}</div>
            {/* <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
            />
            <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
            </Source> */}
            <div>{geojson}</div>
        </div>
    );
}

export default App;
