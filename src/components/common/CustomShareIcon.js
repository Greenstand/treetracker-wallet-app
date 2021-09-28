import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  box2: {
    [theme.breakpoints.down('xs')]: {
      width: '25%',
    },
  },
  avatar: {
    color: green[500],
    backgroundColor: theme.palette.secondary.lightGreen,
    width: '64px',
    height: '64px',
  },
  iconButton: {
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(0),
      paddingRight: theme.spacing(0),
    },
  },
}));

function CustomShareIcon({ handleOnClick, children, mailString }) {
  const classes = useStyles();

  return (
    <Grid item className={classes.box2}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <IconButton className={classes.iconButton} onClick={handleOnClick}>
            {mailString ? (
              <a href={mailString}>
                <Avatar className={classes.avatar}>{children}</Avatar>
              </a>
            ) : (
              <Avatar className={classes.avatar}>{children}</Avatar>
            )}
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomShareIcon;
