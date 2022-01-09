import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  OutlinedInput,
  makeStyles,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import SpotifyIcon from "../assets/img/spofityIcon.svg";
import DiscordOauth2 from "discord-oauth2";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import "react-spotify-auth/dist/index.css";
import Axios from "axios";
const oauth = new DiscordOauth2();

const useStyles = makeStyles((theme) => ({
  Form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    alignItems: "center",
    width: "566px",
    background: `linear-gradient(180deg, rgba(116, 238, 255, 0.15) 0%, rgba(189, 123, 255, 0.15) 100%)`,
    borderRadius: "10px",
    padding: "40px 0 90px 0",
    [theme.breakpoints.down("md")]: {
      width: "100%",

      "& .MuiFormControl-root": {
        width: "90%",
        // margin: "0 16px",
      },
    },
  },
  Input: {
    width: "430px",
    height: "58px",
    backgroundColor: "#fff",
    border: "none",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      height: "40px",
    },
  },
  AvatarDiscord: {
    width: "30px",
    height: "30px",
    marginRight: "15px",
  },
  Span: {
    fontSize: theme.typography.pxToRem(18),
    color: "#fff",
    fontWeight: "600",
    fontFamily: `'Poppins', sans-serif`,
    textAlign: "left",
    marginBottom: "5px",
  },

  ForgetPass: {
    fontSize: theme.typography.pxToRem(14),
    color: "#19ABEA",
    fontFamily: `'Poppins', sans-serif`,
    textAlign: "left",
    marginTop: "5px",
  },

  LogIn: {
    width: "430px",
    height: "58px",
    margin: "30px",
    background: `linear-gradient(87.89deg, #538DFE 1.97%, #AA55FF 99.6%)`,
    borderRadius: "5px",
    fontSize: theme.typography.pxToRem(18),
    color: "#fff",
    fontWeight: "600",
    fontFamily: `'Poppins', sans-serif`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },

    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
  },
  NeedAccount: {
    textAlign: "left",
    width: "430px",
    fontSize: theme.typography.pxToRem(14),
    color: "#fff",
    fontFamily: `'Poppins', sans-serif`,
    fontWeight: "500",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
    "& a": {
      color: "#19ABEA",
      textDecoration: "none",
    },
    marginTop: "20px",
  },
  Avatar: {
    width: "60%",
    height: "60%",
    marginBottom: "25px",
    borderRadius: "0",
  },

  WrapFormControl: {
    marginTop: "50px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
}));

export default function SpotifyForm() {
  const spotifyClient = {
    scopes: "user-read-playback-state user-read-email user-top-read",
    client_id: "39ee24c7036144aca3ffc37bfacba77d",
    redirect_uri: "https://www.musx.io/home-2",
    // redirect_uri: "https://musix-react.herokuapp.com/home-2",
    // redirect_uri: "http://localhost:3000/home-2",
  };

  const classes = useStyles();

  return (
    <Box component="form" className={classes.Form}>
      {/* <Avatar
        alt="discord-icon"
        src={SpotifyIcon}
        className={classes.Avatar}
      ></Avatar> */}

      <a
        style={{ textDecoration: "none" }}
        href={
          "https://accounts.spotify.com/authorize" +
          "?response_type=code" +
          "&client_id=" +
          spotifyClient.client_id +
          "&scope=" +
          encodeURIComponent(spotifyClient.scopes) +
          "&show_dialog=true" +
          "&redirect_uri=" +
          encodeURIComponent(spotifyClient.redirect_uri)
        }
      >
        <Button variant="contained" className={classes.LogIn}>
          LOG IN WITH SPOTIFY
        </Button>
      </a>

      <Typography component="h6" className={classes.NeedAccount}>
        Need an account? <Link to="/register">Register</Link>
      </Typography>
    </Box>
  );
}
