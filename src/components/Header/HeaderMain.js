import React, { useEffect, useState } from "react";
import './HeaderMain.css';
import scope from '../images/scope-icon.png';

export default function HeaderMain() {
    useEffect(() => {
    const searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          const city = this.value.trim();
          if (city) {
            getLatLng(city);
            
          }
        }
      });
    }
  }, []);

  async function getLatLng(city) {
    const apiKey = 'AIzaSyD3iWePy_uZaDbSHmY2rvxQzrkBduzgkqk';
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(city)}&key=${apiKey}`);
    const data = await response.json();
    if (data.status === 'OK') {
      const latLng = data.results[0].geometry.location;
      console.log('Latitude:', latLng.lat);
      console.log('Longitude:', latLng.lng);
    } else {
      console.error('Error:', data.status);
    }
  }

  return (
    <header className='header-main'>
      <a>
        <img id='scope-icon' src={scope} />
      </a>
      <input id='search-bar' type='text' placeholder='Search for a city' />
    </header>
  );
}