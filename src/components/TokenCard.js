import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgressBar from './common/LinearProgressBar';
import { useHistory, useParams } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import log from 'loglevel';
import { getOptimizedCDNUrl } from './utils';

const style = (theme) => ({
  grid: {
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.main,
    height: '16px',
    width: '16px',
    [theme.breakpoints.down('sm')]: {
      height: '14px',
      width: '14px',
    },
  },
  TreeImg: {
    width: '104px',
    height: '104px',
    [theme.breakpoints.down('sm')]: {
      width: '88px',
      height: '88px',
    },
  },
  tokenOwnerName: {
    color: 'rgba(34, 34, 34, 0.6)',
    marginLeft: '8px',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
  },
  tokenDate: {
    fontWeight: '500',
    fontSize: '16px',
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
  },
  tokenName: {
    fontWeight: '700',
    fontSize: '16px',
  },
  iconContainer: {
    background: theme.palette.secondary.lightGreen,
    width: '32px',
    height: '32px',
    [theme.breakpoints.down('sm')]: {
      width: '25px',
      height: '25px',
    },
    marginRight: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    bottom: '8px',
    left: '6px',
    width: '88px',
    [theme.breakpoints.down('sm')]: {
      width: '80px',
      left: '4px',
    },
  },
  avater: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
});

function TokenCard(props) {
  const { classes, token } = props;
  const history = useHistory();

  const params = useParams();
  log.debug('TokenCard params: ', params);

  function handleTreeClick(treeId) {
    history.push(`/wallets/${params.walletName}/trees/${treeId}`);
  }

  function handlePlanterClick(planterId) {
    history.push(`/wallets/${params.walletName}/planters/${planterId}`);
  }

  return (
    <>
      <Grid container className={classes.grid} wrap="nowrap">
        <Grid
          xs={4}
          className={classes.imgContainer}
          container
          item
          direction="row"
          alignItems="center"
        >
          <div className={classes.progress}>
            <LinearProgressBar width="100%" height="8px" value={100} />
          </div>
          <Paper className={classes.TreeImg} elevation={0}>
            <OptimizedImage
              src={token.capture_photo_url}
              width={104}
              height={104}
            />
          </Paper>
        </Grid>
        <Grid container item xs={8}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography className={classes.tokenName}>
              {token.capture_id}
            </Typography>
            <div
              className={classes.iconContainer}
              onClick={() => handleTreeClick(token.capture_id)}
            >
              <ArrowForwardIosIcon className={classes.icon} />
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.tokenDate}>
              {`Claimed on `}
            </Typography>{' '}
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Avatar
              className={classes.avater}
              onClick={handlePlanterClick}
              src={getOptimizedCDNUrl(token.planter_photo_url, 128)}
            />
            <Typography
              onClick={() => handlePlanterClick(token.planter_id)}
              className={classes.tokenOwnerName}
            >
              {`By ${token.planter_first_name}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(style)(TokenCard);
