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
import { GetUsersTopArtists } from "../service/service";

const TopArtists = ({ id, expanded }) => {
  const [userID, setUserID] = useState(null);
  const [artists, setArtists] = useState();

  const getData = async () => {
    setUserID(id);
    const response = await GetUsersTopArtists(id);

    if (response?.isSuccess) {
      console.log(JSON.stringify(response.data.topArtists));
      setArtists(response.data.topArtists);
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
        Top Artists
      </Typography>
      <List>
        {artists?.slice(0, 8).map((item) => (
          <ListItem disablePadding>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={item.images[0]?.url} />
            </ListItemAvatar>
            <ListItemText
              primary={item.name}
              secondary={
                <React.Fragment>
                  {item.genres?.map((genr) => (
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                    >
                      {genr},
                    </Typography>
                  ))}
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};

export default TopArtists;
