import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from 'react';
// import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'
import markerIconPng from './markerIconPng.png'


const LocationMap = ({ city, province }) => {
  const [center, setCenter] = useState([0, 0]);
  const [loaded, setLoaded] = useState(false); //Need to add this to prevent the component from loading without the coordinates. That is why [0, 0] kept being the coordinates.

  useEffect(() => {
    const url = `https://nominatim.openstreetmap.org/search?city=${city}&state=${province}&format=json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { lat, lon } = data[0];
        setCenter([parseFloat(lat), parseFloat(lon)]); // parse the strings to float numbers
        setLoaded(true);
      });
  }, [city, province]);

  if (!loaded) {
    return <div>Loading...</div>;
  }
  console.log(center) //Show coordinates

  return (
    <MapContainer center={center} zoom={13} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="Map data &copy; OpenStreetMap contributors"
      />
      <Marker position={center} icon={new Icon({iconUrl: markerIconPng, iconSize: [26, 35], iconAnchor: [12, 41]})}>
        <Popup>

        </Popup>
      </Marker>

    </MapContainer>
  );
}

export default LocationMap;

