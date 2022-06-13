import React, { useCallback } from "react";
import "./App.css";
import { Map, Source, Layer, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useMemo } from "react";

// get the GPX files.
import { gpx } from "@tmcw/togeojson";
import testGPX from ".//assets/Saturday Option.gpx";
import { DOMParser } from "@xmldom/xmldom";
import Pin from "./components/pin.tsx"
import CAFES from "./assets/cafes.json"

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

    // const [hoverInfo, setHoverInfo] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);

    const [geoInfo, setgeoInfo] = useState({
        source: null,
    });

    const pins = useMemo(
        () =>
          CAFES.map((cafe, index) => (
            <Marker
              key={`marker-${index}`}
              longitude={cafe.longitude}
              latitude={cafe.latitude}
              anchor="bottom"
              onClick={e => {
                // If we let the click event propagates to the map, it will immediately close the popup
                // with `closeOnClick: true`
                e.originalEvent.stopPropagation();
                setPopupInfo(cafe);
              }}
            >
              <Pin />
            </Marker>
          )),
        []
      );

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
    // const onHover = useCallback((event) => {
    //     const {
    //         features,
    //         point: { x, y },
    //     } = event;
    //     const hoveredFeature = features && features[0];
    //     setHoverInfo(hoveredFeature && { feature: hoveredFeature, x, y });
    // });

    return (
        <div className='App'>
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                // onClick={}
                // onMouseMove={onHover}
            >
                {geoInfo.source}
                {pins}
                {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.cafe}, {popupInfo.rating} |{' '}
              {/* <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a> */}
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
                {/* {hoverInfo && (
                    <div
                        className='tooltip'
                        style={{ left: hoverInfo.x, top: hoverInfo.y }}
                    >
                        <div>info: {hoverInfo.feature}</div>
                    </div>
                )} */}
            </Map>
        </div>
    );
}

export default App;
