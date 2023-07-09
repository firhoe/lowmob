import {AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI, SCOPES} from './config';
import SpotifyWebApi from 'spotify-web-api-js';

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
  '%20'
)}&response_type=token&show_dialog=true`;

export const spotifyApi = new SpotifyWebApi();

export default spotifyApi;
