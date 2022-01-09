import React, { useEffect, useState } from "react";

import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Box,
  Container,
  Avatar,
} from "@material-ui/core";

import PeoplePic from "../assets/img/peoplePic.svg";
import axios from "axios";
import TopArtists from "./TopArtists";
import { MOCK_ARTIST } from "../service/mockData";
import ComponenLoading from "./ComponenLoading";
const useStyles = makeStyles((theme) => ({
  holdLederBord: {
    padding: "20px 20px 120px 20px",
    width: "100%",
  },
  NumberButton: {
    background: "linearGradient( #74EEFF 10%, #BD7BFF 10%)",
    backdropFilter: "blur(30px)",
    borderRadius: "10px",
    width: "103px",
    height: "43px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 12px",
    fontSize: theme.typography.pxToRem(18),
    fontFamily: `'Poppins', sans-serif`,
    color: "#fff",
  },
  HoldTitleBoard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0px",
    [theme.breakpoints.down("md")]: {
      paddingLeft: "35px",
      paddingRight: "35px",
      "& h3": {
        marginRight: "40px",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& h3": {
        marginBottom: "20px",
        marginRight: "0",
      },
      flexDirection: "column",
      justifyContent: "center",
    },
  },

  HoldButtonTime: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 300,
    fontFamily: `'Poppins', sans-serif`,
    color: "#fff",
    width: "100%",
    height: "49px",
    background: `linear-gradient(180deg, rgba(116, 238, 255, 0.1) 0%, rgba(189, 123, 255, 0.1) 100%)`,
    backdropFilter: "blur(30px)",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },

  WrapAvatars: {
    paddingTop: "60px",
    textAlign: "center",
  },

  CurrentRank: {
    display: "flex",
    justifyContent: "space-between",
    height: "63px",
    marginTop: "40px",
    marginBottom: "20px",
    alignItems: "center",
    background: `linear-gradient(89.72deg, #3787FF 1.15%, #855AFF 100%)`,
    borderRadius: "10px",
    paddingLeft: "30px",
    paddingRight: "10px",
    cursor: "pointer",
  },
  PersonRank: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "63px",
    alignItems: "center",
    borderRadius: "10px",
    cursor: "pointer",
  },
  PersonRankCard: {
    marginBottom: "20px",
    alignItems: "center",
    background: `linear-gradient(89.72deg, rgba(55, 135, 255, 0.2) 1.15%, rgba(133, 90, 255, 0.2) 100%)`,
    borderRadius: "10px",
    paddingLeft: "30px",
    paddingRight: "10px",
    cursor: "pointer",
  },

  Name: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: "500",
    fontFamily: `'Poppins', sans-serif`,
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.pxToRem(12),
    },
  },

  rankWrapper: {
    marginTop: 20,
  },

  rankName: {
    display: "flex",
    alignItems: "center",
  },
}));

export default function LeaderBoard() {
  const [users, setUsers] = useState([]);
  const [topRanks, setTopRanks] = useState([]);
  const spotifyUser = JSON.parse(localStorage.getItem("spotify_user"));
  const [currentUser, setCurrentUser] = useState(null);
  const [userToExpand, setUserToExpand] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [timeframe, setTimeframe] = useState(0);
  const [loading, setLoading] = useState(true);

  const getUserFavourite = async () => {
    const token = localStorage.getItem("spotify_token");

    console.log(`Bearer ${token}`);

    try {
      // const response = await axios.get("https://api.spotify.com/v1/me/player", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const randomData = async (TF) => {
    setLoading(true);
    if (TF === 1) {
      setUsers(
        users.sort((a, b) => (a.followers.total > b.followers.total ? 1 : -1))
      );
    } else if (TF === 2) {
      setUsers(users.sort((a, b) => (a.id < b.id ? 1 : -1)));
    } else {
      setUsers(users.sort((a, b) => (a.popularity > b.popularity ? 1 : -1)));
    }

    setTimeframe(TF);
    setLoading(false);
  };

  const getRanking = async () => {
    setLoading(true);
    // const response = await axios.get(
    //   "https://musx-app.herokuapp.com/api/ranking"
    // );

    // console.log(response);

    // if (response?.data?.success) {
    //   setUsers(
    //     response.data.data?.users?.sort((a, b) => (a.rank > b.rank ? 1 : -1))
    //   );
    //   setTopRanks(response.data.data?.topThreeRanks);

    //   if (spotifyUser) {
    //     setCurrentUser(
    //       response.data.data?.users?.find(
    //         (item) => item.userId === spotifyUser?.userId
    //       )
    //     );
    //   }
    // }

    setUsers(
      MOCK_ARTIST.sort((a, b) => (a.popularity > b.popularity ? 1 : -1))
    );

    setLoading(false);
  };

  useEffect(() => {
    getRanking();
    getUserFavourite();
  }, []);

  const classes = useStyles();
  return (
    <Container>
      {loading ? (
        <div style={{ width: "100%" }}>
          <ComponenLoading height="100vh" />
        </div>
      ) : (
        <Grid container items spacing={2} className={classes.holdLederBord}>
          {/* <Grid
          item
          xs={9}
          md={12}
          className={classes.CurrentRank}
          style={{
            margin: "20px auto 20px auto",
          }}
        >
          <Box>
            <Typography component="h4" className={classes.Name}>
              YOUR CURRENT RANK
            </Typography>
          </Box>

          <Box>
            <Typography component="span" className={classes.Name}>
              {currentUser ? currentUser.rank : "NO RANK"}
            </Typography>
            <Button>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0)">
                  <path
                    d="M-4.80825e-07 11C-2.1569e-07 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 1.16139e-06 11 1.42652e-06C4.9344 1.69166e-06 -7.45961e-07 4.9344 -4.80825e-07 11ZM11.6481 7.6019L16.2314 12.1853C16.4102 12.364 16.5 12.5987 16.5 12.8333C16.5 13.068 16.4102 13.3027 16.2314 13.4814C15.873 13.8398 15.2937 13.8398 14.9353 13.4814L11 9.54615L7.06475 13.4814C6.70635 13.8398 6.127 13.8398 5.7686 13.4814C5.4102 13.123 5.4102 12.5437 5.7686 12.1853L10.3519 7.6019C10.7103 7.2435 11.2897 7.2435 11.6481 7.6019Z"
                    fill="#00CE2D"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(0 22) rotate(-90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </Box>
        </Grid> */}

          <Grid
            item
            xs={11}
            sm={4}
            md={4}
            style={{
              margin: "0 auto",
            }}
          >
            <Button
              className={`${timeframe === 0 ? "selected" : ""} ${
                classes.HoldButtonTime
              }`}
              onClick={() => randomData(0)}
            >
              ALL TIME
            </Button>
          </Grid>
          <Grid
            item
            xs={11}
            sm={4}
            md={4}
            style={{
              margin: "0 auto",
            }}
          >
            <Button
              className={`${timeframe === 1 ? "selected" : ""} ${
                classes.HoldButtonTime
              }`}
              onClick={() => randomData(1)}
            >
              THIS WEEK
            </Button>
          </Grid>
          <Grid
            item
            xs={11}
            sm={4}
            md={4}
            style={{
              margin: "0 auto",
            }}
          >
            <Button
              className={`${timeframe === 2 ? "selected" : ""} ${
                classes.HoldButtonTime
              }`}
              onClick={() => randomData(2)}
            >
              THIS MONTH
            </Button>
          </Grid>
          <Grid container className={classes.rankWrapper}>
            {users?.map((item, index) => (
              <Grid
                item
                xs={9}
                md={12}
                className={classes.PersonRankCard}
                style={{
                  margin: "0 auto 20px auto",
                }}
              >
                <div className={classes.PersonRank}>
                  <Box className={classes.rankName}>
                    <Avatar
                      style={{ marginRight: 10 }}
                      src={item.images[0]?.url}
                    />
                    <div>
                      <Typography component="h4" className={classes.Name}>
                        {item?.name}
                      </Typography>
                      {item.genres?.map((genr) => (
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                        >
                          {genr},
                        </Typography>
                      ))}
                    </div>
                  </Box>

                  <Box>
                    <Typography component="span" className={classes.Name}>
                      {index + 1}
                    </Typography>
                    <Button
                    // onClick={() => {
                    //   setUserToExpand(expanded ? null : item.userId);
                    //   setExpanded(!expanded);
                    // }}
                    >
                      {userToExpand === item.userId ? (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M22 11C22 4.9344 17.0656 -2.1569e-07 11 -4.80825e-07C4.9344 -7.45961e-07 -2.12304e-06 4.9344 -2.38817e-06 11C-2.65331e-06 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11ZM10.3519 14.3981L5.7686 9.81475C5.58985 9.636 5.5 9.40135 5.5 9.16665C5.5 8.932 5.58985 8.6973 5.7686 8.51855C6.127 8.16015 6.70635 8.16015 7.06475 8.51855L11 12.4538L14.9352 8.5186C15.2937 8.1602 15.873 8.1602 16.2314 8.5186C16.5898 8.877 16.5898 9.45635 16.2314 9.81475L11.6481 14.3981C11.2897 14.7565 10.7103 14.7565 10.3519 14.3981Z"
                              fill="#FB3737"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="22"
                                height="22"
                                fill="white"
                                transform="translate(22) rotate(90)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M-4.80825e-07 11C-2.1569e-07 17.0656 4.9344 22 11 22C17.0656 22 22 17.0656 22 11C22 4.9344 17.0656 1.16139e-06 11 1.42652e-06C4.9344 1.69166e-06 -7.45961e-07 4.9344 -4.80825e-07 11ZM11.6481 7.6019L16.2314 12.1853C16.4102 12.364 16.5 12.5987 16.5 12.8333C16.5 13.068 16.4102 13.3027 16.2314 13.4814C15.873 13.8398 15.2937 13.8398 14.9353 13.4814L11 9.54615L7.06475 13.4814C6.70635 13.8398 6.127 13.8398 5.7686 13.4814C5.4102 13.123 5.4102 12.5437 5.7686 12.1853L10.3519 7.6019C10.7103 7.2435 11.2897 7.2435 11.6481 7.6019Z"
                              fill="#00CE2D"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect
                                width="22"
                                height="22"
                                fill="white"
                                transform="translate(0 22) rotate(-90)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                    </Button>
                  </Box>
                </div>

                {/* {userToExpand === item.userId && (
                  <TopArtists
                    id={userToExpand}
                    expanded={userToExpand === item.userId ? expanded : false}
                  />
                )} */}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
