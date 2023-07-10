![Logo](./src/images/header-text.svg)

# Lowmop®

This is a small front-end experiment developed with Create React App, in which we use the Spotify API to create a slightly interactive interface where you can visualize your playlists, favorite artists, top tracks, and much more... oh, and it also has a music playback bar. It really has many little interactions that I would love for you to discover!

![lowmob®](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXp4b3d6ZmlieGxqNzBtZW00YWFnc2s1bnl5cThlOTRnYWJkZWQ3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jrBXo9YmlJ6K1ROLyD/giphy.gif)

## Take a look 👁‍🗨

- [Lowmob®](https://lowmob.vercel.app/)

## Authentication

The application uses the Spotify authentication flow to obtain an access token. To log in, a "Link up ✹ Spotify" button will be displayed on the home page. Upon clicking the button, you will be redirected to the Spotify website to log in and authorize the application. Once authorized, you will be redirected back to the application with a valid access token.

In case you don't have access, please use this account that will allow you to interact with the web interface:
```sh
Spotify account: new.user.test.spotify@gmail.com
```
```sh
Password: n3w-t3st-spotify
```


## Installation

This project requires node and npm installed globally.

Clone the repository to a directory of your choosing

```sh
$ git clone https://github.com/firhoe/lowmob.git
```

Navigate into the file and install the necessary packages

```sh
$ npm install 
```

To start up the app locally

```sh
$ npm start
```

## Configuration

Before running the application, make sure to configure the following variables in the config.js file:


`AUTH_ENDPOINT` - Spotify authentication endpoint.

`CLIENT_ID` - Spotify application client ID.

`REDIRECT_URI` - Redirect URI after authentication.

`SCOPES` - Spotify API access scopes required by the application.

## Tech / Framework Used

- **React** : A JavaScript framework used to build interactive and reusable user interfaces.
- **JavaScript** : The main programming language used to develop the logic and functionality of the project.
- **Zustand** : A lightweight and fast state management library for React used to store and manage the global state of the application.
- **Spotify Web API** : An API provided by Spotify that allows interaction with the Spotify music platform, such as retrieving user information, playlists, and songs.
- **Framer Motion** : A library used to add smooth animations and transitions to UI elements.
- **React Router** : A library used to manage navigation and routes in a React application.
- **HTML** : The markup language used to structure and present web content.
- **CSS** : The language used to style and design the visual appearance of the project.
- **localStorage** : A JavaScript API used to store and retrieve data in the user's browser.
- **Spotify Authentication API** : Used to authenticate and authorize users through their Spotify account and obtain an access token for making requests to the Spotify API.

## Functionalities

`User Profile` - Displays user information such as their name, followers, and profile picture.

`Playlists` - Displays the user's playlists and allows playback of a selected playlist.

`Music Player` - Allows playing and controlling music, including play, pause, next song, and previous song.

`Artists` - Displays the user's top artists.

`Widgets` - Displays widgets with top songs, recently played songs, and recommended songs.

## Badges

![Spotify](https://img.shields.io/badge/Spotify-1ED760?style=for-the-badge&logo=spotify&logoColor=white)

![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)