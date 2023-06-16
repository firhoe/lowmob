import {authEndpoint, clientId, redirectUri,scopes} from './config';
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

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

const spotifyApi = new SpotifyWebApi();

export const setClientToken = (token) => {
  spotifyApi.setAccessToken(token);
}

export default spotifyApi;
