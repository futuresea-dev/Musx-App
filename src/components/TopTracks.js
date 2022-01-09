import {
  Avatar,
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { ListItemButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GetUsersTopTracks } from "../service/service";

const TopTracks = ({ id, expanded }) => {
  const [userID, setUserID] = useState(null);
  const [tracks, setTracks] = useState([]);

  const getData = async () => {
    setUserID(id);
    const response = await GetUsersTopTracks(id);

    if (response?.isSuccess) {
      console.log(response.data.topTracks);
      setTracks(response.data.topTracks);
    }
  };

  useEffect(() => {
    if (id && userID !== id) {
      getData();
    }
  }, [id]);
  return (
    <Collapse
      in={expanded}
      timeout="auto"
      unmountOnExit
      style={{ color: "#fff" }}
    >
      <Typography variant="h6" paragraph>
        Top Tracks
      </Typography>
      <List>
        {tracks?.slice(0, 8).map((item) => (
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.album?.images[0]?.url} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                  >
                    {item.artists[0]?.name}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default TopTracks;
