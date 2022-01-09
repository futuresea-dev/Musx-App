import React from "react";

import { Grid, Box, Typography } from "@material-ui/core";

const Support = () => {
  return (
    <Grid xs={12}>
      <Box>
        <Typography
          component="h2"
          style={{
            fontSize: "100px",
            color: "red",
          }}
        >
          Support
        </Typography>
      </Box>
    </Grid>
  );
};

export default Support;
