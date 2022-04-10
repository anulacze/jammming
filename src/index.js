import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import {Spotify} from './util/Spotify';

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

Spotify.getAccessToken();