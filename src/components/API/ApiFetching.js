import React, { useEffect, useState } from "react";
import axios from 'axios';
import './ApiFetching.css';

function CordFetch() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  return { lat, long };
}

export default function Weather() {
  const [temperature, setTemperature] = useState(null);
  const { lat, long } = CordFetch();

  useEffect(() => {
    if (lat !== null && long !== null) {
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature`;

      axios.get(apiUrl)
        .then((response) => {
          const currentData = response.data.current;
          setTemperature(currentData.temperature);
        })
        .catch((error) => {
          console.error('Error fetching weather ', error);
        });
    }
  }, [lat, long]);

  return (
    <div className="temp">
      <div className="box"></div>
      {temperature !== null && (
        <p>The current temperature is {temperature}°C.</p>
      )}
      {temperature === null && (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}




// function CordFetch() {

//     const [lat, setLat] = useState([]);
//     const [long, setLong] = useState([]);
  
//     useEffect(() => {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         setLat(position.coords.latitude);
//         setLong(position.coords.longitude);
//       });
  
//       console.log("Latitude is:", lat)
//       console.log("Longitude is:", long)
//     }, [lat, long]);
// };

// export default function ApiFetching() {
//     CordFetch()
//     return (
//         <div>
//             <h1 id="lat"></h1>
//         </div>
//     );
// }