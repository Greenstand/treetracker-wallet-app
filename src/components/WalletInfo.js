import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Share from './Share';

function WalletInfo(props) {
  const { wallet } = props;
  return (
    <>
      <Grid
        container
        sx={{ height: 112, width: '100%', position: 'relative' }}
        pr={2}
        pl={2}
        mb={2}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="caption" color="textSecondary">
              WALLET
            </Typography>
          </Grid>
          <Share shareUrl={window.location.href} />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <Avatar src={wallet?.photo_url} />
          </Grid>
          <Grid item>
            <Typography variant="h6">@{wallet?.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {wallet?.token_in_wallet} tokens
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default WalletInfo;
