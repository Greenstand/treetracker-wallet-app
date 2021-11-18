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

// fake data
const transactions = [
  {
    id: 0,
    transaction_title: 'Token claimed',
    transaction_date: 'Feb 18, 2021',
    transaction_by: 'By Finor X',
  },
  {
    id: 1,
    transaction_title: 'Token assigned',
    transaction_date: 'Jan 26, 2021',
    transaction_by: 'By Freetown City Council',
  },
  {
    id: 2,
    transaction_title: 'Token verified',
    transaction_date: 'Jan 26, 2021',
    transaction_by: 'By Greenstand',
  },
  {
    id: 3,
    transaction_title: 'Token created',
    transaction_date: 'Jan 24, 2021',
    transaction_by: 'By Abayomi',
  },
];

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
      ...transactions.transactions.map((t) => ({
        text: `From ${t.source_wallet_name} to ${t.destination_wallet_name}`,
        title: 'Token transferred',
        time: t.processed_at,
      })),
      {
        text: `By tree ${token.capture_id}`,
        title: 'Token created',
        time: token.created_at,
      },
    ]);
  }

  React.useEffect(() => {
    // fetch data
    load();
  }, []);

  return (
    <div>
      <Timeline className={classes.Timeline}>
        {histories &&
          histories.map((history, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                {index !== transactions.length - 1 ? (
                  <TimelineConnector />
                ) : null}
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
