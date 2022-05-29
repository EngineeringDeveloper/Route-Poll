import './App.css';
import {Map} from "react-map-gl"

// Map with react map
// https://visgl.github.io/react-map-gl/docs/get-started/get-started
function App() {
  return (
    <div className="App">
      <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox:://styles/mapbox/streets-v9"/>
    </div>
  );
}

export default App;
