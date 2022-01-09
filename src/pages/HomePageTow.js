import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import ThreeXGaming from "../assets/img/3xgaming.svg";
import FillForm from "../components/FillForm";
import axios from "axios";
import queryString from "query-string";
import SpotifyForm from "../components/SpotifyForm";
import { SaveUserData } from "../service/service";
import { spotifyApi } from "../service/spotify";

const useStyles = makeStyles((theme) => ({
  HoldBoxes: {
    // paddingTop: "120px",
    marginTop: "-400px",
    textAlign: "center",
    paddingBottom: "240px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingTop: "40px",
    },
  },
  holdTitle: {},
  XGaming: {
    marginTop: "100px",
  },
  holdImg: {
    width: "390px",
    height: "590px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",

    backgroundImage: `url(${ThreeXGaming})`,
  },
}));

export default function HomePageTow({ history, location }) {
  const [redirecting, setRedirecting] = useState(false);
  const handleSpotify = async (code) => {
    var topArtists = [];
    var topTracks = [];

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("redirect_uri", "https://www.musx.io/home-2");

    const response = await axios
      .post("https://musx-app.herokuapp.com/api/spotify-login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .catch((err) => console.log(err));

    console.log(response);

    if (response?.data?.success) {
      await axios
        .get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: "Bearer " + response.data?.data?.accessToken,
          },
        })
        .then((artistRes) => {
          console.log(artistRes?.data?.items);
          topArtists = artistRes?.data?.items;
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: "Bearer " + response.data?.data?.accessToken,
          },
        })
        .then((trackRes) => {
          console.log(trackRes?.data?.items);
          topTracks = trackRes?.data?.items;
        })
        .catch((err) => {
          console.log(err);
        });

      // const discordUser = localStorage.getItem("discord_user");
      // var data = {};

      // console.log(discordUser);
      // if (discordUser) {
      //   data.id = JSON.parse(discordUser)?.discordID;
      //   data.spotifyID = response.data.data.user.userId;
      //   data.spotifyEmail = response.data.data.user.email;
      //   data.topArtist = topArtists;
      //   data.topTrack = topTracks;

      //   console.log(data);

      //   const disResponse = await SaveUserData(data);

      //   console.log(disResponse);

      //   if (disResponse?.isSuccess) {
      //     localStorage.setItem(
      //       "discord_user",
      //       JSON.stringify(disResponse.data.user)
      //     );
      //   }
      // }

      localStorage.setItem(
        "spotify_user",
        JSON.stringify(response.data.data.user)
      );

      history.push("/home-4");
    }
    setRedirecting(false);
  };

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
      setRedirecting(true);
      console.log(code);
      localStorage.setItem("spotify_token", code);
      handleSpotify(code);
    }
  }, [location]);

  const classes = useStyles();

  if (redirecting)
    return (
      <Backdrop
        style={{
          background: "#0A1621",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
        open
      >
        <CircularProgress color="inherit" />
        <Typography
          component="h1"
          className={classes.giveWord}
          style={{
            marginTop: "10px",
          }}
        >
          Redirecting
        </Typography>
      </Backdrop>
    );

  return (
    <div>
      <Grid container items className={classes.HoldBoxes}>
        <Grid item xs={12}>
          <img
            src={ThreeXGaming}
            alt="Three X Gaming Pc"
            style={{ width: "100%" }}
          />
        </Grid>

        <Grid item xs={12}>
          <SpotifyForm />
        </Grid>
      </Grid>
    </div>
  );
}
