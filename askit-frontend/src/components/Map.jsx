import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ places }) => {
  return (
    <MapContainer center={[19.0760, 72.8777]} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      {places.map((place, idx) => (
        <Marker key={idx} position={[place.latitude, place.longitude]}>
          <Popup>
            <strong>{place.name}</strong><br />
            {place.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;