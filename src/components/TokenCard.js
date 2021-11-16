import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LinearProgressBar from './common/LinearProgressBar';
import { useHistory } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';

const style = (theme) => ({
  grid: {
    width: '90%',
    margin: 'auto',
    marginBottom: '4px',
    marginTop: '4px',
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
    fontWeight: '400',
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
  const {
    classes,
    TreeImg,
    ProgressValue,
    TreeName,
    ClaimedDate,
    OwnerName,
    OwnerAvatar,
  } = props;
  const history = useHistory();

  function handleTreeClick() {
    history.push('/wallets/stephanie/trees/123');
  }

  function handlePlanterClick() {
    history.push('/wallets/stephanie/planters/14');
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
          ml={2}
          mr={2}
        >
          <div className={classes.progress}>
            <LinearProgressBar
              width="100%"
              height="8px"
              value={ProgressValue}
            />
          </div>
          <Paper className={classes.TreeImg} elevation={0}>
            <OptimizedImage src={TreeImg} width={104} height={104} />
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
            <Typography className={classes.tokenName}>{TreeName}</Typography>
            <div className={classes.iconContainer}>
              <ArrowForwardIosIcon className={classes.icon} />
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.tokenDate}>
              {`Claimed on ${ClaimedDate}`}
            </Typography>{' '}
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Avatar
              className={classes.avater}
              onClick={handlePlanterClick}
              src={OwnerAvatar}
            />
            <Typography className={classes.tokenOwnerName}>
              {`By ${OwnerName}`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(style)(TokenCard);
