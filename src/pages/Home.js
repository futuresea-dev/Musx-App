import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  Container,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import queryString from "query-string";

import PlayStaion from "../assets/img/palystation.svg";
import PC from "../assets/img/pc.svg";
import GiftCard from "../assets/img/giftCard.svg";

import Razor from "../assets/img/razor.svg";
import DiscordOauth2 from "discord-oauth2";

import FillForm from "../components/FillForm";
import axios from "axios";
import { SaveUserData } from "../service/service";

const useStyles = makeStyles((theme) => ({
  HoldBoxes: {
    textAlign: "center",
    paddingBottom: "199px",
    // "& img": {
    //   width: "100%",
    //   height: "100%",
    // },
  },

  Title: {
    // height: "100vh",
    padding: "100px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      padding: "30px",
    },
  },
  AdjustImg: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
      padding: "10px",
    },
    "& img": {
      width: "60%",
    },
  },

  exclusive: {
    display: "flex",
    justifyContent: "center",
    margin: "150px auto 0 auto",

    [theme.breakpoints.down("md")]: {
      margin: "40px 30px",
    },
  },

  EnterContest: {
    width: "365px",
    height: "76px",
    background: "linear-gradient(87.89deg, #538DFE 1.97%, #AA55FF 99.6%)",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "24px",
    [theme.breakpoints.down("sm")]: {
      width: "230px",
      fontSize: "20px",
    },
  },
  LoginText: {
    marginTop: "119px",

    [theme.breakpoints.down("sm")]: {
      margin: "50px 30px",
    },
  },

  MustLogin: {
    fontSize: theme.typography.pxToRem(50),
    color: "#fff",
    fontWeight: 500,
    width: "70%",
    textAlign: "center",
    margin: "15px auto",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  GiftText: {
    marginTop: "80px",
    width: "60%",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
  },

  MoreMargin: {
    [theme.breakpoints.up("lg")]: {
      marginTop: "-150px",
    },
    [theme.breakpoints.down("sm")]: {
      minHeight: "100vh",
    },
  },

  RazerImg: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  AddMarginLeftRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "end",
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      height: "100vh",
      padding: "10px",
    },
    "& img": {
      width: "70%",
    },
  },
}));

export default function Home({ location, history }) {
  const classes = useStyles();
  const [redirecting, setRedirecting] = useState(false);
  const oauth = new DiscordOauth2();

  const handleSaveUser = async (data) => {
    const response = await SaveUserData(data);

    console.log(response);

    if (response?.isSuccess) {
      localStorage.setItem("discord_user", JSON.stringify(response.data.user));
      history.push("/home-2");
      setRedirecting(false);
    }
  };

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
      setRedirecting(true);
      console.log(code);
      oauth
        .tokenRequest({
          clientId: "904224963752501288",
          clientSecret: "3w2IxjnfwO_vAem1KMRLtE3yktBt0KoQ",
          code: code,
          scope: "identify guilds",
          grantType: "authorization_code",
          redirectUri: "https://www.musx.io/home-4",
          // redirectUri: "https://musix-react.herokuapp.com/home-4",
          // redirectUri: "http://localhost:3000/home-4",
        })
        .then((res) => {
          if (res.access_token) {
            localStorage.setItem("discord_auth_token", res.access_token);
            console.log(res.access_token);
            oauth
              .getUser(res.access_token)
              .then((data) => handleSaveUser(data));
          }
        })
        .catch((err) => {
          console.log(err);
          setRedirecting(false);
        });
    }
  }, [location]);

  if (redirecting)
    return (
      <Container disableGutters maxWidth="lg">
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
      </Container>
    );

  return (
    <Container disableGutters maxWidth="lg">
      <Grid container items className={classes.HoldBoxes}>
        <Grid item className={classes.Title} xs={12} lg={12} style={{}}>
          <Typography component="h2" className={classes.MustLogin}>
            You must login to discord if you want to participate.
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            margin: "0 30px",
          }}
        >
          <FillForm />
        </Grid>
      </Grid>
    </Container>
  );
}
