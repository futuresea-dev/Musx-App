import React, { useEffect } from "react";
import {
  Grid,
  makeStyles,
  Box,
  Container,
  Tabs,
  Tab,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import Navbar from "../components/Navbar";
import LeaderBoard from "../components/LeaderBoard";
import queryString from "query-string";
import DiscordOauth2 from "discord-oauth2";

import { Route, Switch, Redirect } from "react-router-dom";
import PeoplePic from "../assets/img/peoplePic.svg";
import SupportPage from "./Support";
import DownloadPage from "./Download";
import { SaveUserData } from "../service/service";
import SongRank from "../components/SongRank";

const useStyles = makeStyles((theme) => ({
  Holder: {
    padding: "0",
  },
  HoldBoxes: {
    background:
      "linear-gradient(180deg, rgba(116, 238, 255, 0.15) 0%, rgba(189, 123, 255, 0.15) 100%)",
    backdropFilter: "blur(30px)",

    "& .MuiTabs-flexContainer": {},

    "& .MuiTab-textColorInherit.Mui-selected": {
      borderWidth: "6px 0 0 0",
      borderStyle: "solid",
      borderColor: "#8673FF",
      borderTopRightRadius: "4px",
      borderTopLeftRadius: "4px",
      borderBottomRightRadius: "10px",
      borderBottomLeftRadius: "10px",
      background: "#2E425F",
    },

    "& .PrivateTabIndicator-root-19": {
      display: "none",
    },
    "& .MuiTabs-indicator": {
      display: "none",
    },

    "& .MuiPaper-elevation4": {
      boxShadow: "none",
    },

    "& .MuiTab-root": {
      width: "153px",
      height: "70px",
    },
  },
  HoldTabs: {
    minHeight: "100vh",
    marginTop: "40px",

    "& .MuiTab-textColorInherit": {
      color: "#fff",
      fontWeight: "bold",
      fontSize: theme.typography.pxToRem(14),

      [theme.breakpoints.down("sm")]: {
        width: "150px",
        height: "50px",
        fontSize: theme.typography.pxToRem(12),
      },
    },

    "& .MuiTabs-flexContainer": {
      [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
      },
    },
  },
  holdLederBord: {
    padding: "20px 20px 120px 20px",
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
    paddingBottom: "40px",
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

  content: {
    background: "transparent",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
}));

const TabPanel = (props) => {
  const { children, index, value } = props;
  return <Box>{value === index && <Box>{children}</Box>}</Box>;
};

const HomePageFour = ({ location }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const oauth = new DiscordOauth2();

  const handleSaveUser = async (data) => {
    const response = await SaveUserData(data);

    console.log(response);
  };

  useEffect(() => {
    const { code } = queryString.parse(location.search);
    if (code) {
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
        });
    }
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth className={classes.Holder}>
      <Grid container items className={classes.HoldBoxes}>
        {/* <Navbar /> */}

        <Grid container items className={classes.HoldTabs}>
          <Switch>
            <Route exact path="/home-4/home-tabs">
              {/* <Grid item sm={12} lg={3}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    value={value}
                  >
                    <Tab label="LEADERBOARD" />
                    <Tab label="TICKETS" />
                    <Tab label="SERVERS" />
                    <Tab label="PROMOTED SONGS" />
                  </Tabs>
                </Box>
              </Grid> */}
              <Container maxWidth="md">
                <Grid item xs={12}>
                  <Box className={classes.HoldTitleBoard}>
                    <Typography
                      component="h2"
                      className="leaderboard-header-text"
                    >
                      Meet friends and find new artists
                      {/* <svg
                width="100%"
                height="27"
                viewBox="0 0 337 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.132 26V20.96H5.568V0.799998H0.0240002V26H18.132ZM45.1011 26V21.068H31.4211V15.776H43.3011V10.844H31.4211V5.732H44.9211V0.799998H25.9131V26H45.1011ZM78.1823 26L67.3823 0.619998H62.2703L51.4703 26H57.1223L59.4263 20.348H70.0823L72.3863 26H78.1823ZM68.1023 15.452H61.4063L64.7543 7.28L68.1023 15.452ZM108.892 13.4V13.328C108.892 6.236 103.42 0.799998 95.4997 0.799998H85.6717V26H95.4997C103.42 26 108.892 20.492 108.892 13.4ZM103.096 13.472C103.096 17.936 100.036 20.996 95.4997 20.996H91.2157V5.804H95.4997C100.036 5.804 103.096 8.936 103.096 13.4V13.472ZM136.62 26V21.068H122.94V15.776H134.82V10.844H122.94V5.732H136.44V0.799998H117.432V26H136.62ZM166.929 26L160.773 17C163.977 15.812 166.173 13.256 166.173 9.188V9.116C166.173 3.932 162.609 0.799998 156.669 0.799998H145.149V26H150.693V17.936H155.049L160.449 26H166.929ZM160.557 9.476C160.557 11.6 159.009 13.04 156.309 13.04H150.693V5.804H156.201C158.901 5.804 160.557 7.028 160.557 9.404V9.476ZM210.578 19.088V19.016C210.578 15.632 208.778 13.94 205.862 12.824C207.662 11.816 209.174 10.232 209.174 7.388V7.316C209.174 3.356 206.006 0.799998 200.858 0.799998H189.158V26H201.146C206.834 26 210.578 23.696 210.578 19.088ZM203.666 8.324C203.666 10.196 202.118 10.988 199.67 10.988H194.558V5.66H200.03C202.37 5.66 203.666 6.596 203.666 8.252V8.324ZM205.07 18.404C205.07 20.276 203.594 21.14 201.146 21.14H194.558V15.596H200.966C203.81 15.596 205.07 16.64 205.07 18.332V18.404ZM244.406 13.4V13.328C244.406 6.164 238.826 0.368 231.05 0.368C223.274 0.368 217.622 6.236 217.622 13.4V13.472C217.622 20.636 223.202 26.432 230.978 26.432C238.754 26.432 244.406 20.564 244.406 13.4ZM238.61 13.472C238.61 17.792 235.514 21.32 231.05 21.32C226.586 21.32 223.418 17.72 223.418 13.4V13.328C223.418 9.008 226.514 5.48 230.978 5.48C235.442 5.48 238.61 9.08 238.61 13.4V13.472ZM275.859 26L265.059 0.619998H259.947L249.147 26H254.799L257.103 20.348H267.759L270.063 26H275.859ZM265.779 15.452H259.083L262.431 7.28L265.779 15.452ZM305.128 26L298.972 17C302.176 15.812 304.372 13.256 304.372 9.188V9.116C304.372 3.932 300.808 0.799998 294.868 0.799998H283.348V26H288.892V17.936H293.248L298.648 26H305.128ZM298.756 9.476C298.756 11.6 297.208 13.04 294.508 13.04H288.892V5.804H294.4C297.1 5.804 298.756 7.028 298.756 9.404V9.476ZM336.184 13.4V13.328C336.184 6.236 330.712 0.799998 322.792 0.799998H312.964V26H322.792C330.712 26 336.184 20.492 336.184 13.4ZM330.388 13.472C330.388 17.936 327.328 20.996 322.792 20.996H318.508V5.804H322.792C327.328 5.804 330.388 8.936 330.388 13.4V13.472Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="-3"
                    y1="21"
                    x2="339"
                    y2="2.5"
                    gradientUnits="userSpaceOnUse"
                    >
                    <stop stop-color="#37DBFF" />
                    <stop offset="1" stop-color="#7058FF" />
                    </linearGradient>
                </defs>
              </svg> */}
                    </Typography>
                    <Button className={classes.NumberButton}>
                      <Typography component="span">
                        <svg
                          width="31"
                          height="31"
                          viewBox="0 0 31 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0)">
                            <path
                              d="M23.7485 7.24311V10.704H23.6496C23.6496 11.9236 20.3865 12.8795 16.497 12.8795C15.0138 12.9124 13.4976 12.7476 12.0473 12.3851V12.4839C11.3221 11.8577 10.4981 11.3962 9.60814 11.0995V11.0336L9.50928 7.3749C9.77299 8.49556 12.8054 9.38551 16.53 9.38551C20.2547 9.38551 23.6497 8.42964 23.6497 7.24304L23.7485 7.24311Z"
                              fill="#F4B844"
                            />
                            <path
                              d="M16.5961 5.10065C20.5184 5.10065 23.7816 6.08945 23.7816 7.27611C23.7816 8.46277 20.4855 9.41858 16.5961 9.41858C12.7066 9.41858 9.80602 8.52863 9.54237 7.40797V7.27611C9.50937 6.08945 12.6737 5.10065 16.5961 5.10065Z"
                              fill="#FEDB41"
                            />
                            <path
                              d="M17.1893 20.5926V23.3614H16.5301C15.0798 23.3943 13.6295 23.2295 12.2121 22.8999L12.1133 22.801C13.0362 21.977 13.6954 20.9222 14.091 19.7686H14.2557C14.9479 19.8345 15.7061 19.8674 16.4641 19.8674H17.1563L17.1893 20.5926Z"
                              fill="#E2A63B"
                            />
                            <path
                              d="M16.563 16.2416L16.8926 16.4064C16.8596 16.4724 16.8596 16.5383 16.8596 16.6042C16.8596 16.7031 16.8926 16.802 16.9256 16.9009V19.9992H16.563C15.739 19.9992 14.915 19.9663 14.1898 19.9003H14.025C14.2557 19.1752 14.3546 18.4171 14.3546 17.659C14.3546 17.1646 14.2887 16.6702 14.2227 16.1758H14.3875C15.1128 16.2416 15.8379 16.2416 16.563 16.2416Z"
                              fill="#F4B844"
                            />
                            <path
                              d="M12.0473 12.3851C13.4976 12.7477 15.0138 12.9125 16.4971 12.8795C20.3865 12.8795 23.6496 11.9236 23.6496 10.7041H23.7485V14.5935C20.1228 14.5935 17.1562 15.4505 16.7937 16.5382L16.497 16.3734C15.8048 16.3734 15.1456 16.3404 14.4534 16.2745H14.2886C13.959 14.7913 13.1679 13.4398 12.0143 12.451L12.0473 12.3851Z"
                              fill="#E2A63B"
                            />
                            <path
                              d="M31 20.2301V23.724C31 24.9106 27.8027 25.8994 23.9133 25.8994C20.0239 25.8994 16.9255 24.9436 16.9255 23.757V20.5926C17.4529 21.6145 20.3205 22.4055 23.7814 22.4055C27.2424 22.4055 30.9011 21.4167 30.9011 20.2301H31Z"
                              fill="#E2A63B"
                            />
                            <path
                              d="M30.9999 16.802V20.23H30.9011C30.9011 21.4166 27.6709 22.4055 23.7814 22.4055C19.892 22.4055 17.4529 21.6144 16.8596 20.5926V16.9998C17.2881 18.0875 20.2546 18.9115 23.8144 18.9115C27.3743 18.9115 30.8352 17.9557 30.934 16.802H30.9999Z"
                              fill="#F4B844"
                            />
                            <path
                              d="M16.7608 16.9998C16.7278 16.9009 16.6948 16.835 16.6948 16.7361C16.6948 16.6701 16.6948 16.6042 16.7278 16.5383C17.0903 15.4505 20.0898 14.5606 23.7485 14.5606H23.7815C27.7038 14.5606 30.9999 15.5165 30.9999 16.7361V16.802C30.9011 17.9557 27.6379 18.9445 23.7815 18.9445C19.925 18.9445 17.1893 18.0875 16.7608 16.9998Z"
                              fill="#FEDB41"
                            />
                            <path
                              d="M14.4535 16.2746C14.5194 16.736 14.5854 17.2304 14.5854 17.6919C14.5854 18.417 14.4865 19.1422 14.2887 19.8014C13.8932 20.988 13.201 22.0757 12.2781 22.8998C10.9926 24.0864 9.31162 24.7456 7.56466 24.7456C3.67518 25.0093 0.280187 22.0757 0.016472 18.1534C-0.247243 14.264 2.68631 10.869 6.60873 10.6053C6.93831 10.5723 7.26795 10.5723 7.59753 10.6053C8.28969 10.6053 9.01485 10.7041 9.67407 10.9019C10.597 11.1985 11.454 11.693 12.1791 12.3192C13.2998 13.374 14.1239 14.7583 14.4535 16.2746Z"
                              fill="#FEDB41"
                            />
                            <path
                              d="M7.26794 21.2188C9.21576 21.2188 10.7948 19.6398 10.7948 17.6919C10.7948 15.7441 9.21576 14.1651 7.26794 14.1651C5.32011 14.1651 3.74109 15.7441 3.74109 17.6919C3.74109 19.6398 5.32011 21.2188 7.26794 21.2188Z"
                              fill="#F4B844"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="31" height="31" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </Typography>
                      348
                    </Button>
                  </Box>
                </Grid>

                {/* <Grid
                  item
                  xs={10}
                  md={12}
                  style={{
                    margin: "0 auto 40px",
                  }}
                >
                  <Box className={classes.WrapAvatars}>
                    <img
                      src={PeoplePic}
                      alt="peoplePicture"
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Box>
                </Grid> */}
              </Container>
              <Paper className={classes.content}>
                <Grid item sm={12} lg={12}>
                  <Box className={classes.tabBox}>
                    <Tabs onChange={handleChange} value={value} centered>
                      <Tab label="Top Artists" />
                      <Tab label="Top Tracks" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <LeaderBoard />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <SongRank />
                  </TabPanel>
                </Grid>
              </Paper>
            </Route>
            <Route exact path="/home-4/support" component={SupportPage} />
            <Route exact path="/home-4/download" component={DownloadPage} />
            <Redirect from="/" to="/home-4/home-tabs" />
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};
export default HomePageFour;
