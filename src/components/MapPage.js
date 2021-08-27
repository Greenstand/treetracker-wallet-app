import React from "react";
import log from "loglevel";
import Map from "client/src/models/Map";
import "client/src/style.css";
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-utfgrid/L.UTFGrid.js";
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from "@material-ui/core/Paper";
import drawer from "../images/drawer.png";

const style = (theme) => ({
  map: {
    width: "100vw",
    height: 288,
  },
  paper: {
    background: "transparent",
  }, 
  rounded: {
    borderRadius: 20,
  },
  drawer: {
    height: 549,
  },
})

function MapPage(props){
  const { classes } = props
  const mapRef = React.useRef(null);

  //load map
  React.useEffect(() => {
    log.info("load map...");
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDUGv1-FFd7NFUS6HWNlivbKwETzuIPdKE&libraries=geometry';
    script.id = 'googleMaps';
    document.body.appendChild(script);
    const parameters = {
      wallet: "Malinda51",
    };
    const map = new Map({
//      onLoad: loaded,
//      onClickTree: showPanel,
//      onFindNearestAt: handleFindNearestAt,
//      onError: handleError,
      filters: parameters,
    });
    map.mount(mapRef.current);
    mapRef.current.map = map;
  }, []);
  return(
    <div  >
      <div id="map-canvas" className={classes.map} ref={mapRef}/>
      <SwipeableDrawer
        anchor={"bottom"}
        open={true}
        classes={{paper: classes.paper}}
      >
        <Paper className={classes.drawer} classes={{rounded: classes.rounded}} >
          <Grid className={classes.box} container >
            <img src={drawer} />
          </Grid>
        </Paper>
      </SwipeableDrawer>
    </div>
  )
}

export default withStyles(style)(MapPage);
