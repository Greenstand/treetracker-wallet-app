import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../images/avatar.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import LinearProgressBar from './common/LinearProgressBar';
import { useHistory } from 'react-router-dom';

const style = (theme) => ({
  grid: {
    width: '100%',
    padding: '8px 24px',
    marginBottom: '8px',
  },
  icon: {
    color: '#86C232',
    height: '16px',
    width: '16px',
  },
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    width: '104px',
    height: '104px',
    borderRadius: '8px',
  },
  tokenOwnerName: {
    color: 'rgba(34, 34, 34, 0.6)',
    marginLeft: '8px',
  },
  tokenDate: {
    fontWeight: '400',
  },
  tokenName: {
    fontWeight: '700',
  },
  iconContainer: {
    background: '#F7FBF7',
    width: '32px',
    height: '32px',
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
        >
          <div className={classes.progress}>
            <LinearProgressBar width="88px" height="8px" value={80} />
          </div>
          <img
            onClick={handleTreeClick}
            className={classes.img}
            src={`https://www.almrsal.com/wp-content/uploads/2015/03/Plants-Pictures.jpg`}
          />
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
            <Avatar onClick={handlePlanterClick} src={avatar} />
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
