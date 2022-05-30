import React from "react";
import "./App.css";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";

// get the GPX files.
import { gpx } from "@tmcw/togeojson";
import testGPX from ".//assets/Saturday Option .gpx";
import { DOMParser } from "@xmldom/xmldom";
// const DomParser = require("@xmldom/xmldom").DomParser; // node doesn't have xml parsing or a dom.

// const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
//     ]
//   };

// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-property
const layerStyle = {
    id: "gpsLine",
    type: "line",
    paint: {
        "line-color": "#fc4c02",
        "line-width": 2.5,
    },
};

// Map with react map & Mapbox
// https://visgl.github.io/react-map-gl/docs/get-started/get-started
function App() {
    const [viewState, setViewState] = useState({
        latitude: 54.9783,
        longitude: -1.6178,
        zoom: 10,
    });

    const [geoInfo, setgeoInfo] = useState({
        source: null,
    });

    useEffect(() => {
        fetch(testGPX)
            .then((r) => r.text())
            .then((text) => {
                // generate a geojson for a route
                const gpxDom = new DOMParser().parseFromString(text, 'text/xml')
                const geojson = gpx(gpxDom);
                setgeoInfo({
                    source: (
                        <Source id='my-data' type='geojson' data={geojson}>
                            <Layer {...layerStyle} />
                        </Source>
                        // <div>Test Finished</div>
                    ),
                });
                // console.log(geojson);
            });
    }, [])

    return (
        <div className='App'>
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
            >
                {geoInfo.source}
                </Map>
        </div>
    );
}

export default App;
