import {create} from 'zustand';

export const useStore = create((set) => {
  const storedToken = localStorage.getItem('spotifyToken');

  return {
    spotifyToken: storedToken || '',
    loggedIn: !!storedToken,
    setSpotifyToken: (token) => {
      localStorage.setItem('spotifyToken', token);
      set({spotifyToken: token});
    },
    setLoggedIn: (loggedIn) => set({loggedIn: loggedIn}),
    setLogOut: () => {
      localStorage.removeItem('spotifyToken');
      set({loggedIn: false, spotifyToken: ''});
    },
    playlists: [],
    setPlaylists: (playlists) => set({playlists: playlists}),
  };
});
