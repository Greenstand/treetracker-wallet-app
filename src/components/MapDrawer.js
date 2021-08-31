import React from "react";
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const style = (theme) => ({
  map: {
    width: "100vw",
    height: "100vh",
  },
  paper: {
    background: "transparent",
  }, 
  rounded: {
    borderRadius: 20,
  },
  drawer: {
    height: 549,
    width: "100%",
  },
  box: {
    justifyContent: "center",
  }
})

function MapDrawer(props){
  const {classes} = props;

  return(
      <SwipeableDrawer
        anchor={"bottom"}
        open={true}
        classes={{paper: classes.paper}}
      >
        <Paper className={classes.drawer} classes={{rounded: classes.rounded}} >
          <Grid className={classes.box} container >
            Test
          </Grid>
        </Paper>
      </SwipeableDrawer>
  )
}

export default withStyles(style)(MapDrawer);
