var SpotifyWebApi = require("spotify-web-api-node");

export const spotifyApi = new SpotifyWebApi({
  clientId: "39ee24c7036144aca3ffc37bfacba77d",
  clientSecret: "8ede682693ee44afb8d443b401d32d21",
  // redirectUri: "https://musix-react.herokuapp.com/home-2",
  redirectUri: "https://www.musx.io/home-2",
});
