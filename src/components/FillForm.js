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
import Discord from "../assets/img/discord.svg";
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
    width: "114px",
    height: "114px",
    marginBottom: "25px",
  },

  WrapFormControl: {
    marginTop: "50px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "30px",
    },
  },
}));

export default function FillForm() {
  const client = {
    clientId: "904224963752501288",
    clientSecret: "3w2IxjnfwO_vAem1KMRLtE3yktBt0KoQ",
    baseUrl: "https://discordapp.com/api/oauth2/authorize",
    redirectUrl: "https://www.musx.io",
    // redirectUrl: "https://musix-react.herokuapp.com",
    // redirectUrl: "http://localhost:3000",
  };

  const classes = useStyles();

  return (
    <Box component="form" className={classes.Form}>
      <Avatar
        alt="discord-icon"
        src={Discord}
        className={classes.Avatar}
      ></Avatar>

      <a
        style={{ textDecoration: "none" }}
        href={`${client.baseUrl}?client_id=${client.clientId}&redirect_url=${client.redirectUrl}&response_type=code&scope=identify`}
      >
        <Button
          variant="contained"
          className={classes.LogIn}
          // onClick={handleDiscord}
        >
          <Avatar
            alt="discord-icon"
            src={Discord}
            className={classes.AvatarDiscord}
          ></Avatar>
          LOG IN WITH DISCORD
        </Button>
      </a>
    </Box>
  );
}
