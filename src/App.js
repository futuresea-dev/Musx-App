import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import { makeStyles } from "@material-ui/core";
import HomePageTow from "./pages/HomePageTow";
import DiscordOauth2 from "discord-oauth2";
import HomePageThree from "./pages/HomePageThree";
import HomePageFour from "./pages/HomePageFour";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  App: {
    backgroundColor: "#0A1621",
  },
}));

function App() {
  const oauth = new DiscordOauth2();

  useEffect(() => {
    const discord_token = localStorage.getItem("discord_auth_token");
    if (discord_token) {
      oauth.getUser(discord_token).then(console.log);
    }
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Router>
        {/* <Link to="/">Home one</Link>
        <Link to="/home-2">Home two</Link>
        <Link to="/home-3">Home three</Link>
        <Link to="/home-4">Home four</Link> */}

        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/">
          <Redirect to="/home-2" />
        </Route>
        <Route exact path="/home-2" component={HomePageTow} />
        <Route path="/home-3" component={HomePageThree} />
        <Route path={["/home-4", "/auth/callback"]} component={HomePageFour} />
      </Router>
    </div>
  );
}

export default App;
