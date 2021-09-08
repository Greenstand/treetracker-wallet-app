import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import logo from '../images/logo.png';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    right: 16,
    top: -32,
    width: 184,
    height: 32,
    borderRadius: '8px 8px 0 0',
    backgroundColor: theme.palette.background.paper,
  },
}));

function PoweredBy() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.root}
      alignContent="flex-end"
      justifyContent="center"
    >
      <Typography variant="caption">Powered by&nbsp;</Typography>
      <img src={logo} width="95" height="16" />
    </Grid>
  );
}

export default PoweredBy;
