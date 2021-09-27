import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Box from '@material-ui/core/Box';
import Share from './Share';

import LinearProgressBar from './common/LinearProgressBar';
import DetailPage from '../components/common/DetailPage';
import CustomizedTabs from './common/CustomizedTabs';
import ImpactManagerImg from '../images/Impact-Manager.png';
import ImpactProducerImg from '../images/Impact-Producer.png';

const style = (theme) => ({
  TreeInfo: {
    padding: '16px 24px',
  },
  Label: {
    color: '#22222299',
    fontSize: 12,
  },
  Title: {
    color: '#373A3E',
    fontSize: 24,
  },
  SubTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
    alignItems: 'center',
    display: 'flex',
  },
  icon: {},
  chip: {
    borderRadius: 4,
    color: 'white',
    fontSize: 12,
    background: '#67AC5B',
    marginRight: 4,
  },
  chipIcon: {
    fontSize: 24,
    color: 'white',
  },
  TreeImgContainer: {
    width: '100%',
    height: '240px',
    position: 'relative',
  },
  TreeImg: {
    width: '100%',
    height: '100%',
  },
  avater: {
    width: '128px',
    height: '128px',
    border: '4px solid white',
    position: 'absolute',
    bottom: '-48px',
    left: '24px',
  },
  ClaimedInfo: {
    marginTop: '64px',
    padding: '0 24px',
    lineHeight: '24px',
  },
  ImpactTokenContainer: {
    padding: '8px 24px',
  },
  ImpactManagerContainer: {
    padding: '8px 24px',
  },
  ImpactManagerImg: {
    width: '104px',
  },
  ImpactProducerContainer: {
    padding: '8px 24px',
  },
  ImpactProducerImg: {
    width: '104px',
  },
  TextContent: {
    fontSize: 16,
    fontWeight: 400,
  },
  overlay: {
    position: 'absolute',
    zIndex: 1300,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

function TreePage(props) {
  const { classes } = props;

  return (
    <div className={classes.overlay}>
      <DetailPage>
        <Paper elevation={0}>
          <Grid className={classes.TreeInfo}>
            <span className={classes.Label}>TREE</span>
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography className={classes.Title} variant="h6">
                Marula
              </Typography>
              <div>
                <Share shareUrl={window.location.href} />
              </div>
            </Grid>
            <Grid>
              <Chip
                className={classes.chip}
                icon={<DoneIcon className={classes.chipIcon} />}
                label="Tree verified"
              />
              <Chip
                className={classes.chip}
                icon={<DoneIcon className={classes.chipIcon} />}
                label="Token issued"
              />
            </Grid>
          </Grid>
          <Grid className={classes.TreeImgContainer}>
            <img
              className={classes.TreeImg}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSIUWEWO5Tm1xMXtfiYKhAHoGnywS9h7W5Lw&usqp=CAU"
            />
            <Avatar
              className={classes.avater}
              src="https://media.gettyimages.com/photos/portrait-of-a-girl-picture-id938709362?s=612x612"
            />
          </Grid>
          <Grid>
            <p className={classes.ClaimedInfo}>
              Claimed on <strong>January 29, 2021</strong>, 2:35 PM By{' '}
              <strong>Abayomi</strong>, in <strong>Tanzania</strong>
            </p>
          </Grid>
          <Grid className={classes.ImpactTokenContainer}>
            <Typography className={classes.SubTitle} variant="h6">
              Impact Token Value
            </Typography>
            <LinearProgressBar width="100%" height="24px" value={80} />
            <a
              style={{
                marginTop: '10px',
                color: '#67AC5B',
                textDecoration: 'underline',
                lineHeight: 2,
              }}
              href="#"
            >
              How is this value calculated?
            </a>
          </Grid>
          <Grid className={classes.ImpactManagerContainer}>
            <Typography className={classes.SubTitle} variant="h6">
              Impact Manager
              <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <IconButton>
                  <InfoOutlinedIcon style={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <img className={classes.ImpactManagerImg} src={ImpactManagerImg} />
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <CustomizedTabs
              tab1="Details"
              tab2="History"
              tab1Veiw={
                <>
                  <Grid className={classes.ImpactProducerContainer}>
                    <Typography className={classes.SubTitle} variant="h6">
                      Impact Producer
                      <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                        <IconButton>
                          <InfoOutlinedIcon style={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <img
                      className={classes.ImpactProducerImg}
                      src={ImpactProducerImg}
                    />
                  </Grid>
                  <Grid className={classes.ImpactProducerContainer}>
                    <Typography className={classes.SubTitle} variant="h6">
                      Token ID
                    </Typography>
                    <p className={classes.TextContent}>
                      7f22f06f-d665-492e-ab7c-7328d78f6bf9
                    </p>
                  </Grid>
                  <Grid className={classes.ImpactProducerContainer}>
                    <Typography className={classes.SubTitle} variant="h6">
                      Meta Data
                    </Typography>
                    <p className={classes.TextContent}>
                      xxxxxxxxxxxxxxxxxxxxxxxx
                    </p>
                  </Grid>
                </>
              }
              tab2Veiw={<h1 style={{ padding: '0 24px' }}>History</h1>}
            />
          </Grid>
        </Paper>
      </DetailPage>
    </div>
  );
}

export default withStyles(style)(TreePage);
