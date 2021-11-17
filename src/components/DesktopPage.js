import React from 'react';
import log from 'loglevel';
import Map from 'treetracker-web-map-core/src/Map';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-utfgrid/L.UTFGrid.js';
import withStyles from '@mui/styles/withStyles';
import Drawer from '@mui/material/Drawer';
import { Grid } from '@mui/material';
import WalletInfo from './WalletInfo';
import CustomizedTabs from './common/CustomizedTabs';
import TokensList from './TokensList';
import Tokens from './TokensArray';
import axios from 'axios';

const style = () => ({
  map: {
    width: '100vw',
    height: '100vh',
  },
  paper: {
    background: 'transparent',
  },
  rounded: {
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  drawer: {
    height: 549,
    width: '100%',
  },
  box: {
    justifyContent: 'center',
  },
});

function DesktopPage(props) {
  const { classes } = props;
  const mapRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const [wallet, setWallet] = React.useState({ name: 'Stephanie' });

  //load map
  React.useEffect(() => {
    log.info('load map...');
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDUGv1-FFd7NFUS6HWNlivbKwETzuIPdKE&libraries=geometry';
    script.id = 'googleMaps';
    document.body.appendChild(script);
    const parameters = {
      wallet: 'Malinda51',
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

  return (
    <div className="App" ref={containerRef}>
      <div id="map-canvas" className={classes.map} ref={mapRef} />
      <div ref={containerRef}>
        <Drawer variant="permanent" anchor="left">
          <Grid container>
            <WalletInfo wallet={wallet} />
          </Grid>
        </Drawer>
      </div>
    </div>
  );
}

export default withStyles(style)(DesktopPage);
