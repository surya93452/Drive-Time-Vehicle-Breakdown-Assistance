import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet library
import 'leaflet/dist/leaflet.css';
import fuelIcon from './fuel.jpg'; // Import the custom pin marker image
import './petrol.css'; // Import the CSS file with custom styles

const NearbyPetrolBunks = () => {
    const [loading, setLoading] = useState(true);
    const [petrolBunks, setPetrolBunks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNearbyPetrolBunks = async () => {
            try {
                const position = await getCurrentPosition();
                const { latitude, longitude } = position.coords;

                const response = await fetchNearbyBunks(latitude, longitude);
                setPetrolBunks(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching nearby petrol bunks:', error);
                setError('Failed to fetch nearby petrol bunks. Please try again.');
                setLoading(false);
            }
        };

        fetchNearbyPetrolBunks();
    }, []);

    const getCurrentPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                resolve,
                (error) => {
                    console.error('Error getting current position:', error);
                    setError('Failed to get current position. Please ensure location access is enabled.');
                    setLoading(false);
                    reject(error);
                },
                { enableHighAccuracy: true } // Request high accuracy position
            );
        });
    };

    const fetchNearbyBunks = async (latitude, longitude) => {
        try {
            const radius = 10000; // 5 kilometers (adjust as needed)
            const searchQuery = 'fuel';

            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&countrycodes=IN&bounded=1&viewbox=${longitude - 0.025},${latitude - 0.025},${longitude + 0.025},${latitude + 0.025}&limit=10`;

            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                return data;
            } else {
                throw new Error('Failed to fetch nearby petrol bunks.');
            }
        } catch (error) {
            throw new Error('Failed to fetch nearby petrol bunks.');
        }
    };

    useEffect(() => {
        console.log('Petrol Bunks:', petrolBunks); // Log petrol bunks data for debugging
    }, [petrolBunks]);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    // Check if petrolBunks array is not empty before accessing its first element
    const mapCenter = petrolBunks.length > 0 ? [petrolBunks[0]?.lat, petrolBunks[0]?.lon] : [0, 0];

    // Define custom marker icon
    const customMarkerIcon = L.icon({
        iconUrl: fuelIcon,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });

    return (
        <div className="container">
            <h2 className="heading">Nearby Petrol Bunks</h2>
            <MapContainer center={mapCenter} zoom={13} style={{ height: '550px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {petrolBunks.map((bunk, index) => (
                    <Marker key={index} position={[parseFloat(bunk.lat), parseFloat(bunk.lon)]} icon={customMarkerIcon}>
                        <Popup className="popup-content">{bunk.display_name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default NearbyPetrolBunks;
