import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import BackButton from './BackButton';

const style = (theme) => ({
  paper: {
    overflow: 'visible',
    borderRadius: '20px 20px 0 0px',
  },
  rounded: {
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    width: '100%',
    position: 'absolute',
    zIndex: '-1',
  },
  drawer: {
    height: '70vh',
    width: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  backButton: {
    position: 'absolute',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    height: '48px',
    width: '48px',
    borderRadius: '32px',
    top: '8px',
    left: '8px',
  },
});

const PlanterDetailPageFrame = (props) => {
  const { classes, imgUrl, children } = props;

  return (
    <div>
      <img src={imgUrl} className={classes.image} />
      <div className={classes.backButton}>
        <BackButton />
      </div>
      <SwipeableDrawer
        anchor={'bottom'}
        open={open}
        classes={{ paper: classes.paper }}
        disableSwipeToOpen={true}
        BackdropProps={{ open: false }}
      >
        <Paper
          className={classes.drawer}
          classes={{ rounded: classes.rounded }}
        >
          {children}
        </Paper>
      </SwipeableDrawer>
    </div>
  );
};

export default withStyles(style)(PlanterDetailPageFrame);
