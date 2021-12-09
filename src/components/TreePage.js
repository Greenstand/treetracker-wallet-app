import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Share from './Share';

import OptimizedImage from './OptimizedImage';
import { getOptimizedCDNUrl } from './utils';
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
  Label: {
    color: '#22222299',
    fontSize: 12,
  },
  chip: {
    borderRadius: 4,
    fontSize: 12,
  },
  TreeImgContainer: {
    width: '100%',
    height: '240px',
    position: 'relative',
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
    border: `${theme.spacing(0.5)} solid ${theme.palette.common.white}`,
    position: 'absolute',
    bottom: '-48px',
    left: '24px',
  },
});

function TreePage(props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { classes } = props;
  const [tree, setTree] = React.useState({});
  const [planter, setPlanter] = React.useState({});
  const [screenWidth] = React.useState(window.innerWidth);

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
          <Grid
            container
            sx={{ height: 112, width: '100%', position: 'relative' }}
            pr={2}
            pl={2}
            mb={2}
            mt={2}
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid>
                <Typography variant="caption" color="textSecondary">
                  TREE
                </Typography>
              </Grid>
              <Share shareUrl={window.location.href} />
            </Grid>
            <Grid item alignItems="center" justifyContent="space-between">
              <Typography variant="h4">Tree #{tree.id}</Typography>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Chip
                  className={classes.chip}
                  color="primary"
                  icon={<DoneIcon fontSize="small" />}
                  label="Tree verified"
                />
              </Grid>
              <Grid item>
                <Chip
                  color="primary"
                  className={classes.chip}
                  icon={<DoneIcon fontSize="small" />}
                  label="Token issued"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.TreeImgContainer}>
            <OptimizedImage src={tree.photo_url} width={screenWidth * 0.9} />
            <Avatar
              className={classes.avatar}
              src={getOptimizedCDNUrl(planter.photo_url, 128)}
            />
          </Grid>
          <Grid container direction="column" p={3}>
            <Grid>
              <Typography mt={8} paragraph>
                Claimed on <strong>January 29, 2021</strong>, 2:35 PM By{' '}
                <strong>Abayomi</strong>, in <strong>Tanzania</strong>
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" gutterBottom>
                Impact Token Value
              </Typography>
              <LinearProgressBar width="100%" height="24px" value={80} />
              {!isOpen ? (
                <Typography
                  color="primary"
                  sx={{
                    textDecoration: 'underline',
                    mt: 1,
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
            <Grid>
              <Typography variant="h6">
                Impact Manager
                <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                  <IconButton size="large">
                    <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </Typography>
              <img width={104} src={ImpactManagerImg} />
            </Grid>
            <CustomizedTabs
              tab1="Details"
              tab2="History"
              tab1Veiw={
                <>
                  <Grid>
                    <Typography variant="h6">
                      Impact Producer
                      <Tooltip title="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                        <IconButton size="large">
                          <InfoOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <img width={104} src={ImpactProducerImg} />
                  </Grid>
                  <Grid>
                    <Typography variant="h6">Token ID</Typography>
                    <Typography>{tree.token_id}</Typography>
                  </Grid>
                  <Grid>
                    <Typography variant="h6">Meta Data</Typography>
                    <Typography>xxxxxxxxxxxxxxxxxxxxxxxx</Typography>
                  </Grid>
                </>
              }
              tab2Veiw={
                <div style={{ padding: '0 24px' }}>
                  <TransactionsHistory tokenId={tree.token_id} />
                </div>
              }
            />
          </Grid>
        </Paper>
      </DetailPage>
    </div>
  );
}

export default withStyles(style)(TreePage);
