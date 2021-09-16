import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../images/avatar.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LinearProgressBar from './common/LinearProgressBar';
import { useHistory } from 'react-router-dom';

const style = (theme) => ({
  grid: {
    width: '90%',
    marginBottom: '4px',
    marginTop: '4px',
  },
  icon: {
    color: theme.palette.primary.main,
    height: '16px',
    width: '16px',
    [theme.breakpoints.down(330)]: {
      height: '14px',
      width: '14px',
    },
  },
  TreeImg: {
    width: '104px',
    height: '104px',
    [theme.breakpoints.down(330)]: {
      width: '88px',
      height: '88px',
    },
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    borderRadius: '8px',
  },
  tokenOwnerName: {
    color: 'rgba(34, 34, 34, 0.6)',
    marginLeft: '8px',
    fontSize: '16px',
    [theme.breakpoints.down(330)]: {
      fontSize: 'small',
    },
  },
  tokenDate: {
    fontWeight: '400',
    fontSize: '16px',
    [theme.breakpoints.down(330)]: {
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
    [theme.breakpoints.down(330)]: {
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
    [theme.breakpoints.down(330)]: {
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
      <Grid container spacing={3} className={classes.grid}>
        <Grid
          xs={4}
          className={classes.imgContainer}
          container
          direction="row"
          alignItems="center"
          ml={2}
        >
          <div className={classes.progress}>
            <LinearProgressBar width="100%" height="8px" value={80} />
          </div>
          <Paper className={classes.TreeImg} elevation={0}>
            <img
              className={classes.img}
              onClick={handleTreeClick}
              src={`https://www.almrsal.com/wp-content/uploads/2015/03/Plants-Pictures.jpg`}
            />
          </Paper>
        </Grid>
        <Grid container xs={8}>
          <Grid
            item
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography className={classes.tokenName}>Marula</Typography>
            <div className={classes.iconContainer}>
              <ArrowForwardIosIcon className={classes.icon} />
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.tokenDate}>
              Claimed on January 29, 2021
            </Typography>{' '}
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Avatar
              className={classes.avater}
              onClick={handlePlanterClick}
              src={avatar}
            />
            <Typography className={classes.tokenOwnerName}>
              By Abayomi
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(style)(TokenCard);
