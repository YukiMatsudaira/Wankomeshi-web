import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router-dom'
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <AppBar position="static" style={{ color: "#fff", backgroundColor: "#FF5500" }}>
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <HomeIcon onClick={async () => {
                try {
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
              }}/>
            </IconButton>
            <Typography textalign="left" variant="h6" className={classes.title}>
              <Box fontWeight="fontWeightBold" textalign="left">わんこ飯</Box>
            </Typography>
            <FaceIcon onClick={async () => {
                try {
                  props.history.push("mypage");
                } catch (error) {
                  alert(error.message);
                }
              }}
            />
        </Toolbar>
        </AppBar>
    </div>
  );
}

export default withRouter(Header)