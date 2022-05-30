import React, { useCallback } from "react";
import "./App.css";
import { Map, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect } from "react";

// get the GPX files.
import { gpx } from "@tmcw/togeojson";
import testGPX from ".//assets/Saturday Option .gpx";
import { DOMParser } from "@xmldom/xmldom";

// examples: http://visgl.github.io/react-map-gl/examples

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

    const [hoverInfo, setHoverInfo] = useState(null);

    const [geoInfo, setgeoInfo] = useState({
        source: null,
    });

    useEffect(() => {
        fetch(testGPX)
            .then((r) => r.text())
            .then((text) => {
                // generate a geojson for a route
                const gpxDom = new DOMParser().parseFromString(
                    text,
                    "text/xml"
                );
                const geojson = gpx(gpxDom);
                setgeoInfo({
                    source: (
                        <Source
                            id='my-data'
                            type='geojson'
                            data={geojson}
                        >
                            <Layer {...layerStyle} />
                        </Source>
                        // <div>Test Finished</div>
                    ),
                });
                // console.log(geojson);
            });
    }, []);

    // https://github.com/visgl/react-map-gl/blob/7.0-release/examples/geojson/src/app.tsx
    const onHover = useCallback((event) => {
        const {
            features,
            point: { x, y },
        } = event;
        const hoveredFeature = features && features[0];
        setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    });
    return (
        <div className='App'>
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                // onClick={}
                onMouseMove={onHover}
            >
                {geoInfo.source}
                {hoverInfo && (
                    <div
                        className='tooltip'
                        style={{ left: hoverInfo.x, top: hoverInfo.y }}
                    >
                        <div>info: {hoverInfo.feature}</div>
                    </div>
                )}
            </Map>
        </div>
    );
}

export default App;
