import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Location = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    
    const fetchLocationData = async (lat, lon) => {
        console.log(parseFloat(lat).toFixed(2))
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=22.71&lon=75.85&appid=cd8990ee519781a0bc6968e77b06a2bc`;

        const res = await fetch(endpoint);
        const data = res.json();
        console.log(data)
    }

    useEffect(() => {
        // Check if the Geolocation API is supported by the browser
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success callback
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    fetchLocationData(position.coords.latitude, position.coords.longitude);
                },
                // Error callback
                (error) => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []); 

    return (
        <div>
            {latitude && longitude ? (
                <div>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                </div>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
};

export default Location