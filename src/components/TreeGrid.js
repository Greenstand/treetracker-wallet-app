import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Avatar, Grid, Paper, Typography, ButtonBase} from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 0,
    margin: "auto",
    width: 328,
    height: 104,
  },
  image: {
    width: 104,
    height: 104
  },
  image2: {
    width: 32,
    height: 32
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: '8px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  img2: {
    width: "100%",
    height: "100%",
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={0}>
        <Grid container style={{ paddingRight:-16 }}>
          <Grid item style={{ padding:0 }}>
            <div className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src='/images/tree.png' 
              />
            </div>
          </Grid>
          <Grid item xs={12} sm container style={{ padding: 0}}>
            <Grid item xs container direction="column" spacing={1} style={{paddingLeft: 16, paddingTop: 4}}>
            <Grid item>
              <Grid item xs={12} sm container>
                <Grid item>
                <Typography gutterBottom variant="subtitle1" style={{width: 168, height: 24, fontWeight: 700}}>
                  Marula
                </Typography>
                </Grid>
                <Grid item style={{ marginTop: 6, marginLeft: 8}}>
                    <ArrowForwardIosIcon style={{fill: '#86C323', width: 16, height: 16}}/>
                </Grid>
                </Grid>
                <Typography variant="body2" gutterBottom >
                  Claimed on January 29, 2021
                </Typography>
                <Grid item xs={12} sm container spacing={1} style={{marginTop: 8}}>
                  <Grid item className={classes.image2}>
                    <Avatar className={classes.img2} alt="Remy Sharp" src="/images/farmer.jpeg" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" color="textSecondary">
                      By Abayomi
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}