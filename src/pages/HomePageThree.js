import React from "react";
import { Grid, makeStyles, Typography, Box } from "@material-ui/core";
import FillForm from "../components/FillForm";

import SpotifyIcon from "../assets/img/spofityIcon.svg";

import SmallThreeGamignPic from "../assets/img/smallThreexGaming.svg";

const useStyles = makeStyles((theme) => ({
  HoldBoxes: {
    paddingTop: "120px",
    textAlign: "center",
    paddingBottom: "240px",
    [theme.breakpoints.down("sm")]: {
      paddingRight: "20px",
      paddingLeft: "20px",
      paddingTop: "40px",
    },
  },

  HoldTitle: {
    marginBottom: "134px",
  },

  ImgMobile: {
    [theme.breakpoints.down("sm")]: {
      "& img": {
        width: "100%",
        height: "100%",
      },
    },
  },
}));

export default function HomePageThree() {
  const classes = useStyles();
  return (
    <div>
      <Grid container items className={classes.HoldBoxes}>
        <Grid item xs={12} className={classes.HoldTitle}>
          <Typography component="h2">
            <svg
              width="100%"
              height="45"
              viewBox="0 0 454 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.5985 9.288V0.199997H0.478506V9.288H14.1105V45H23.9665V9.288H37.5985ZM96.5065 45V0.199997H86.6505V17.928H68.4745V0.199997H58.6185V45H68.4745V27.016H86.6505V45H96.5065ZM154.796 45V36.232H130.476V26.824H151.596V18.056H130.476V8.968H154.476V0.199997H120.684V45H154.796ZM245.082 15.816V15.688C245.082 6.536 238.618 0.199997 227.93 0.199997H209.626V45H219.482V31.56H226.97C237.018 31.56 245.082 26.184 245.082 15.816ZM235.098 16.008C235.098 19.848 232.218 22.792 227.29 22.792H219.482V9.096H227.098C232.026 9.096 235.098 11.464 235.098 15.88V16.008ZM304.536 45L293.592 29C299.288 26.888 303.192 22.344 303.192 15.112V14.984C303.192 5.768 296.856 0.199997 286.296 0.199997H265.816V45H275.672V30.664H283.416L293.016 45H304.536ZM293.208 15.624C293.208 19.4 290.456 21.96 285.656 21.96H275.672V9.096H285.464C290.264 9.096 293.208 11.272 293.208 15.496V15.624ZM335.81 45V0.199997H325.954V45H335.81ZM396.414 45V36.36H371.774L396.414 7.688V0.199997H359.87V8.84H383.742L359.102 37.512V45H396.414ZM453.311 45V36.232H428.991V26.824H450.111V18.056H428.991V8.968H452.991V0.199997H419.199V45H453.311Z"
                fill="url(#paint0_linear)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="8.32143"
                  y1="28.2656"
                  x2="454.856"
                  y2="-25.0107"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#8053FE" />
                  <stop offset="1" stop-color="#C955FF" />
                </linearGradient>
              </defs>
            </svg>
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box component="div" className={classes.ImgMobile}>
            <img src={SpotifyIcon} alt="Spotify Icon" />
          </Box>
          <FillForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="div">
            <img
              src={SmallThreeGamignPic}
              alt="Spotify Icon"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
