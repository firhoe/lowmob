import {create} from 'zustand';

export const useStore = create((set) => {
  const storedToken = localStorage.getItem('spotifyToken');

  return {
    // Estado para almacenar el token de acceso de Spotify
    spotifyToken: storedToken || '',

    // Estado para indicar si el usuario ha iniciado sesión
    loggedIn: !!storedToken,

    // Función para establecer el token de acceso de Spotify
    setSpotifyToken: (token) => {
      localStorage.setItem('spotifyToken', token);
      set({spotifyToken: token});
    },

    // Función para establecer el estado de inicio de sesión
    setLoggedIn: (loggedIn) => set({loggedIn: loggedIn}),

    // Función para cerrar sesión y eliminar el token de acceso
    setLogOut: () => {
      localStorage.removeItem('spotifyToken');
      set({loggedIn: false, spotifyToken: ''});
    },

    // Estado para almacenar los datos del usuario
    user: {
      name: '',
      followers: 0,
      image: null,
    },

    // Función para establecer los datos del usuario
    setUser: (userData) => set(() => ({ user: userData })),

    // Estado para almacenar las playlists del usuario
    playlists: [],

    // Función para establecer el estado de las playlists
    setPlaylists: (playlists) => set({playlists: playlists}),

    // Estado para almacenar las canciones de una playlist
    tracks: [],

    // Función para establecer el estado de las canciones
    setTracks: (tracks) => set({tracks}),

    // Estado para almacenar la canción actualmente seleccionada
    currentTrack: null,

    // Función para establecer la canción actual
    setCurrentTrack: (track) => set({currentTrack: track}),

    // Índice actual de la pista seleccionada
    currentIndex: 0,

    // Función para establecer el índice actual de la pista
    setCurrentIndex: (index) => set({currentIndex: index}),
  };
});
