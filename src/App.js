import "./App.css";
import { Map } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

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
            <Map
                {...viewState}
                onMove={(evt) => setViewState(evt.viewState)}
                style={{ width: 600, height: 400 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
            />
        </div>
    );
}

export default App;
