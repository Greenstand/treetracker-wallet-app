import React from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

function index({ classes }) {
  return (
    <div>
      <Timeline className={classes.Timeline}>
        {transactions.map((transaction, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              {index !== transactions.length - 1 ? <TimelineConnector /> : null}
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
                  {transaction.transaction_title}
                </Typography>
                <Typography className={classes.Date} variant="h6">
                  {transaction.transaction_date}
                </Typography>
              </Grid>
              <Grid>
                <Typography className={classes.User} variant="h6">
                  {transaction.transaction_by}
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
