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

const style = (theme) => ({
  grid: {
    width: '90%',
    margin: 'auto',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    color: theme.palette.textSecondary.lightGrey,
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      fontSize: 'small',
    },
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
          container
          item
          direction="row"
          alignItems="center"
          sx={{ position: 'relative' }}
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
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {token.capture_id}
            </Typography>
            <div
              className={classes.iconContainer}
              onClick={() => handleTreeClick(token.capture_id)}
            >
              <ArrowForwardIosIcon
                sx={{ fontSize: 24, color: 'primary.main' }}
              />
            </div>
          </Grid>
          <Grid item>
            <Typography variant="body1" className={classes.tokenDate}>
              {`Claimed on `}
            </Typography>
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Avatar
              sx={{ height: 32, width: 32 }}
              onClick={handlePlanterClick}
              src={token.planter_photo_url}
            />
            <Typography
              onClick={() => handlePlanterClick(token.planter_id)}
              className={classes.tokenOwnerName}
              variant="body1"
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
