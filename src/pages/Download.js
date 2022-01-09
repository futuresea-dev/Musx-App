import React from "react";

import { Grid, Box, Typography } from "@material-ui/core";

const DownLoad = () => {
  return (
    <Grid item xs={12}>
      <Box>
        <Typography
          component="h2"
          style={{
            fontSize: "100px",
            color: "red",
          }}
        >
          DownLoad
        </Typography>
      </Box>
    </Grid>
  );
};

export default DownLoad;
