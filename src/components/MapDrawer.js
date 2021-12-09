import React from 'react';
import withStyles from '@mui/styles/withStyles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ExpandLess from '@mui/icons-material/ExpandLess';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import log from 'loglevel';
import WalletInfo from './WalletInfo';
import CustomizedTabs from './common/CustomizedTabs';
import PoweredBy from './PoweredBy';
import Fade from '@mui/material/Fade';
import TokensList from './TokensList';
import ImpactTab from './ImpactTab';
import Box from '@mui/material/Box';

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
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  box: {
    justifyContent: 'center',
  },
  bottomPaper: {
    width: '100%',
    height: 48,
    position: 'fixed',
    bottom: 0,
    boxShadow: '0px -12px 16px rgba(0, 0, 0, 0.25)',
    zIndex: 1000,
    borderRadius: '8px 8px 0 0 ',
  },
  bottomBox: {
    height: theme.spacing(6),
  },
  bottomArrow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
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
  const { classes, open, setOpen } = props;
  const [wallet, setWallet] = React.useState({});
  const [tokens, setTokens] = React.useState([]);

  // console.log("Tokens List", tokens)

  function handleClickBottom() {
    setOpen(true);
  }

  React.useEffect(() => {
    getWalletData();
  }, []);

  const getWalletData = async () => {
    let response = await axios.request({
      url: `${process.env.REACT_APP_API_WALLET}/wallets/180Earth`,
    });
    setWallet(response.data);
    response = await axios.request({
      url: `${process.env.REACT_APP_API_WALLET}/tokens/query/wallet=180Earth&withPlanter=true&withCapture=true`,
    });
    setTokens(response.data.tokens);
    log.warn('loaded wallet:', wallet);
  };

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
        style={{ position: 'relative' }}
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
            <CustomizedTabs
              tab1="Tokens"
              tab2="Impact"
              tab1Veiw={<TokensList tokens={tokens} />}
              tab2Veiw={<ImpactTab />}
            />
          </Grid>
        </Paper>
      </SwipeableDrawer>
      {!open && (
        <Fade in={true} timeout={500}>
          <Box sx={{ position: 'relative' }}>
            <PoweredBy />
            <Paper className={classes.bottomPaper} onClick={handleClickBottom}>
              <Grid
                container
                className={classes.bottomBox}
                wrap="nowrap"
                pt={1}
              >
                <Grid item className={classes.bottomArrow}>
                  <ExpandLess color="action" />
                </Grid>
                <Grid item className={classes.bottomContent}>
                  <Grid container className={classes.box1}>
                    <Grid item className={classes.bottomItem}>
                      <Avatar
                        src={wallet?.photo_url}
                        className={classes.avatar}
                      />
                    </Grid>
                    <Grid item className={classes.bottomItem}>
                      <Typography variant="h5">@${wallet.name}</Typography>
                    </Grid>
                    <Grid item className={classes.bottomItem}>
                      <Typography variant="body1">
                        ${wallet?.token_in_wallet} tokens
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default withStyles(style)(MapDrawer);
