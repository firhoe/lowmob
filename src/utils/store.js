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
    setUser: (userData) => set(() => ({user: userData})),

    // Estado para almacenar las playlists del usuario
    playlists: [],

    // Función para establecer el estado de las playlists
    setPlaylists: (playlists) => set({playlists: playlists}),

    // Estado para almacenar los artistas del usuario
    artists: [],

    // Función para establecer el estado de los artistas
    setArtists: (artists) => set({artists}),

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

    // Estado para indicar si la música se está reproduciendo
    isPlaying: false,

    // Función para establecer el estado de reproducción
    setIsPlaying: (playing) => set({isPlaying: playing}),

    // Estado para almacenar el progreso de la pista actual
    trackProgress: 0,

    // Función para establecer el progreso de la pista
    setTrackProgress: (progress) => set({trackProgress: progress}),

    // Estado que indica si el reproductor está activo o no
    isPlayerActive: true,

    // Función para actualizar el estado de isPlayerActive.
    setIsPlayerActive: (isActive) => set({isPlayerActive: isActive}),

    // Estado para almacenar las top 5 canciones del usuario
    topTracks: [],

    // Función para establecer el estado de las top 5 canciones
    setTopTracks: (tracks) => set({topTracks: tracks}),

    // Estado para almacenar las canciones recomendadas
    recommendedTracks: [],

    // Función para establecer el estado de las canciones recomendadas
    setRecommendedTracks: (tracks) => set({recommendedTracks: tracks}),

    // Estado para almacenar las canciones guardadas del usuario
    savedTracks: [],

    // Función para establecer el estado de las canciones guardadas
    setSavedTracks: (tracks) => set({savedTracks: tracks}),
  };
});
