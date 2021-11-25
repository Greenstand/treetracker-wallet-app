import React from 'react';
import { useTheme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ShareIcon from '@mui/icons-material/Share';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Box from '@mui/material/Box';
import Share from './Share';

import LinearProgressBar from './common/LinearProgressBar';
import DetailPage from '../components/common/DetailPage';
import CustomizedTabs from './common/CustomizedTabs';
import TransactionsHistory from './TransactionsHistory';
import ImpactManagerImg from '../images/Impact-Manager.png';
import ImpactProducerImg from '../images/Impact-Producer.png';
import Caution from './Caution';
import log from 'loglevel';

import * as utils from './utils';

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
});

function TreePage(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { classes } = props;
  const [tree, setTree] = React.useState({});
  const [planter, setPlanter] = React.useState({});

  // get tree id from url with the help of react-router
  const treeId = props.match.params.treeId;
  // log tree id
  log.info('tree id: ', treeId);

  async function load() {
    const tree = await utils.request(`/trees/${treeId}`);
    setTree(tree);
    const planter = await utils.request(`/planters/${tree.planter_id}`);
    setPlanter(planter);
  }

  React.useEffect(() => {
    load();
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 9999,
        width: '100vw',
      }}
    >
      <DetailPage>
        <Paper elevation={0}>
          <Grid className={classes.TreeInfo}>
            <span className={classes.Label}>TREE</span>
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography className={classes.Title} variant="h6">
                Tree #{tree.id}
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
            <img className={classes.TreeImg} src={tree.photo_url} />
            <Avatar className={classes.avater} src={planter.photo_url} />
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
            {!isOpen ? (
              <Typography
                style={{
                  marginTop: '10px',
                  color: '#67AC5B',
                  textDecoration: 'underline',
                  lineHeight: 2,
                }}
                href="#"
                onClick={() => setIsOpen(true)}
              >
                How is this value calculated?
              </Typography>
            ) : (
              <Caution setIsOpen={setIsOpen} />
            )}
          </Grid>
          <Grid className={classes.ImpactManagerContainer}>
            <Typography className={classes.SubTitle} variant="h6">
              Impact Manager
              <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                <IconButton size="large">
                  <InfoOutlinedIcon style={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Typography>
            <img className={classes.ImpactManagerImg} src={ImpactManagerImg} />
          </Grid>

          <CustomizedTabs
            tab1="Details"
            tab2="History"
            tab1Veiw={
              <>
                <Grid className={classes.ImpactProducerContainer}>
                  <Typography className={classes.SubTitle} variant="h6">
                    Impact Producer
                    <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                      <IconButton size="large">
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
                  <p className={classes.TextContent}>{tree.token_id}</p>
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
            tab2Veiw={
              <p style={{ padding: '0 24px' }}>
                <TransactionsHistory tokenId={tree.token_id} />
              </p>
            }
          />
        </Paper>
      </DetailPage>
    </div>
  );
}

export default withStyles(style)(TreePage);
