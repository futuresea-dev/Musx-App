import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  loading: {
    //   minHeight: 180,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    verticalAlign: "middle",
    width: "100%",
  },
  loadingInner: {
    width: "100%",
    textAlign: "center",
  },
}));

const ComponenLoading = (props) => {
  const classes = useStyles();
  const { height } = props;
  return (
    <div className={classes.loading} style={{ minHeight: height }}>
      <div className={classes.loadingInner}>
        <CircularProgress color="inherit" size={25} thickness={6} />
      </div>
    </div>
  );
};

export default ComponenLoading;
