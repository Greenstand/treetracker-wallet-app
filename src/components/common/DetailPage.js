import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import BackButton from '../../components/common/BackButton';

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
  drawer: {
    height: '90vh',
    width: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  backButton: {
    position: 'absolute',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px',
    height: '48px',
    width: '48px',
    borderRadius: '32px',
    top: '8px',
    left: '16px',
  },
  ArrowBackIosIcon: {
    height: '32px',
    width: '32px',
  },
});

function DetailPage(props) {
  const [open, setOpen] = React.useState(true);
  const { classes, children } = props;

  return (
    <div>
      <div className={classes.backButton}>
        <BackButton />
      </div>
      <SwipeableDrawer
        anchor={'bottom'}
        open={open}
        classes={{ paper: classes.paper }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen={true}
        BackdropProps={{ open: false }}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
}

export default withStyles(style)(DetailPage);
