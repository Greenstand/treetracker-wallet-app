import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  box2: {
    [theme.breakpoints.down('sm')]: {
      width: '25%',
    },
  },
  avatar: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  iconButton: {
    [theme.breakpoints.down('sm')]: {
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
          <IconButton
            className={classes.iconButton}
            onClick={handleOnClick}
            size="large"
          >
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
