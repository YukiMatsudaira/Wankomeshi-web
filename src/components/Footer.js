import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  footer: {
    color: "#ebf6f7",
    backgroundColor: "#FF5500",
    position: "fixed",
    bottom: 0,
    width: "100%",
  },
});

const Footer = () => {
  const classes = useStyles();
  return <Box fontWeight="fontWeightBold" textAlign="center" className={classes.footer}>wankomeshi</Box>;
};

export default Footer;