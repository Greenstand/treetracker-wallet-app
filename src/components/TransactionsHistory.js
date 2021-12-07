import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import * as utils from './utils';
import log from 'loglevel';

const style = (theme) => ({
  Timeline: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  MuiTimelineOppositeContentRoot: {
    flex: '1 !important',
    width: '100%',
    textAlign: 'left',
    justifyContent: 'spaceBetween',
    display: 'flex',
    flexDirection: 'column',
    paddingRight: 0,
  },
  Title: {
    color: theme.palette.textPrimary,
    fontSize: 16,
    fontWeight: 700,
  },
  Date: {
    color: theme.palette.textPrimary,
    fontSize: 16,
    fontWeight: 400,
  },
  User: {
    color: theme.palette.textSecondary.darkGray,
    fontSize: 16,
    fontWeight: 400,
  },
});

function index({ classes, tokenId }) {
  const [transactions, setTransactions] = React.useState(undefined);
  const [histories, setHistories] = React.useState([]);
  const [token, setToken] = React.useState(undefined);

  async function load() {
    const token = await utils.request(`/tokens/${tokenId}`);
    log.info('token: ', token);
    const transactions = await utils.request(`/transactions?token=${tokenId}`);
    log.info('transactions: ', transactions);
    setTransactions(transactions);

    setHistories([
      {
        text: `By tree ${token.capture_id}`,
        title: 'Token created',
        time: token.created_at,
      },
      ...transactions.transactions.map((t) => ({
        text: `From ${t.source_wallet_name} to ${t.destination_wallet_name}`,
        title: 'Token transferred',
        time: t.processed_at,
      })),
    ]);
  }

  React.useEffect(() => {
    // fetch data
    load();
  }, []);

  return (
    <div>
      <Timeline className={classes.Timeline}>
        {/*We need to reverse the array so the dates are in the proper order */}
        {histories &&
          histories.reverse().map((history, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                {index !== histories.length - 1 ? <TimelineConnector /> : null}
              </TimelineSeparator>
              <TimelineOppositeContent
                style={{ flex: 0.1 }}
                className={classes.MuiTimelineOppositeContentRoot}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography className={classes.Title} variant="h6">
                    {history.title}
                  </Typography>
                  <Typography className={classes.Date} variant="h6">
                    {history.time}
                  </Typography>
                </Grid>
                <Grid>
                  <Typography className={classes.User} variant="h6">
                    {history.text}
                  </Typography>
                </Grid>
              </TimelineOppositeContent>
            </TimelineItem>
          ))}
      </Timeline>
    </div>
  );
}

export default withStyles(style)(index);
