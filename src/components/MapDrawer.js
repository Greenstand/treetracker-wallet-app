import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../images/avatar.png';
import drawer from '../images/drawer.png';
import axios from 'axios';
import log from 'loglevel';
import WalletInfo from './WalletInfo';
import CustomizedTabs from './common/CustomizedTabs';
import TokenCard from './TokenCard';
import LinearProgressBar from './common/LinearProgressBar';
import PoweredBy from './PoweredBy';
import Fade from '@material-ui/core/Fade';

const style = (theme) => ({
  map: {
    width: '100vw',
    height: '100vh',
  },
  paper: {
    background: 'transparent',
    overflow: 'visible',
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
  bottomPaper: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    boxShadow: '0 -1px 2px rgb(0 0 0 / 30%)',
    zIndex: 1000,
  },
  bottomBox: {
    height: theme.spacing(6),
  },
  bottomArrow: {
    width: theme.spacing(6),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    flexGrow: 1,
  },
  bottomItem: {
    marginLeft: theme.spacing(1),
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  box1: {
    height: '100%',
    alignItems: 'center',
    width: '100%',
  },
  handle: {
    backgroundColor: '#DADCE0',
    borderRadius: 50,
    height: 4,
    margin: '0 auto',
    width: 24,
    marginTop: 10,
  },
});

function MapDrawer(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(true);
  const [wallet, setWallet] = React.useState(undefined);

  function handleClickBottom() {
    setOpen(true);
  }

  React.useEffect(async () => {
    const response = await axios.request({
      url: `${process.env.REACT_APP_API_WALLET}/wallets/SustainablyRun`,
    });
    setWallet(response.data);
    log.warn('loaded wallet:', wallet);
  }, []);

  return (
    <>
      <SwipeableDrawer
        anchor={'bottom'}
        open={open}
        classes={{ paper: classes.paper }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen={true}
        BackdropProps={{ open: false }}
      >
        <Paper
          className={classes.drawer}
          classes={{ rounded: classes.rounded }}
        >
          <Grid container>
            <div className={classes.handle} />
          </Grid>
          <Grid className={classes.box} container>
            {wallet && <div style={{ display: 'none' }}>@{wallet.name}</div>}
            <WalletInfo wallet={wallet} />
            <CustomizedTabs tab1="Tokens" tab2="Impact" />
            <TokenCard />
          </Grid>
        </Paper>
      </SwipeableDrawer>
      {!open && (
        <Fade in={true} timeout={500}>
          <Paper className={classes.bottomPaper} onClick={handleClickBottom}>
            <PoweredBy />
            <Grid container className={classes.bottomBox}>
              <Grid item className={classes.bottomArrow}>
                <ExpandLess color="action" />
              </Grid>
              <Grid item className={classes.bottomContent}>
                <Grid container className={classes.box1}>
                  <Grid item className={classes.bottomItem}>
                    <Avatar src={avatar} className={classes.avatar} />
                  </Grid>
                  <Grid item className={classes.bottomItem}>
                    <Typography variant="h6">@${wallet.name}</Typography>
                  </Grid>
                  <Grid item className={classes.bottomItem}>
                    <Typography variant="body1">127 tokens</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
      )}
    </>
  );
}

export default withStyles(style)(MapDrawer);
