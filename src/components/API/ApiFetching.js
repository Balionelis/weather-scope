import React, { useEffect, useState } from "react";
import axios from 'axios';
import './ApiFetching.css';

async function CheckPerms() {
  const permissionStatus = await navigator?.permissions?.query({name: 'geolocation'});
  const hasPermission = permissionStatus?.state;
  console.log('Geolocation permission status:', hasPermission);
  return hasPermission;
}

(async () => {
  const hasPermission = await CheckPerms();
  if (hasPermission === 'denied') {
    alert('Please enable location services to view the weather');
  }
})();

function CordFetch() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition(
      function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      },
      function(error) {
        console.error('Error:', error);
      },
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(id);
    };
  }, []);

  return { lat, long };
}

export default function Weather() {
  const [temperature, setTemperature] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const { lat, long } = CordFetch();

  useEffect(() => {
    if (lat !== null && long !== null) {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature&current=visibility&current=wind_speed_10m`;

      axios.get(apiUrl)
        .then((response) => {
          const currentData = response.data.current;
          setTemperature(currentData.temperature);
          setVisibility(currentData.visibility);
          setWindSpeed(currentData.wind_speed_10m);
        })
        .catch((error) => {
          console.error('Error fetching weather ', error);
        });
    }
  }, [lat, long]);

  return (
    <div className="temp">
      <div className="box"></div>
      <div className="info">
        <h2>Weather for your current location:</h2>
        
        {temperature !== null && (
          <p className="temperature-info">
            The current temperature is <span className="value">{temperature}°C</span>
          </p>
        )}
        {temperature === null && (
          <p>Loading weather data...</p>
        )}

        {visibility !== null && (
          <p className="visibility-info">
            The current visibility is <span className="value">{visibility}m.</span>
          </p>
        )}
        {visibility === null && (
          <p>Loading weather data...</p>
        )}

        {windSpeed !== null && (
          <p className="wind-speed-info">
            The current wind speed is <span className="value">{windSpeed}m/s.</span>
          </p>
        )}
        {windSpeed === null && (
          <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
}