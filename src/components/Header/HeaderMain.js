import React from 'react';
import './HeaderMain.css';
import scope from '../images/scope-icon.png';

export default function HeaderMain() {
    return (
        <header className='header-main'>
            <a href="#">
              <img id='scope-icon' src={scope}/>
            </a>
            {/* <input id='search-bar' type='text' placeholder='Search for a city'/> */}
        </header>
    );
}