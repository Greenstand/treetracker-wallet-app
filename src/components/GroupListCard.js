import React from 'react';
import Grid from '@mui/material/Grid';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from '@mui/material/Typography';
import OptimizedImage from './OptimizedImage';

function GroupListCard(props) {
  const { country } = props;

  return (
    <Grid container m={3}>
      <Grid item container spacing={0.5} columns={3} sx={{ width: '33%' }}>
        {country.imgList.map((img, i) => (
          <Grid
            item
            key={i}
            sx={{ width: 32, height: 32, flexBasis: '30%' }}
            xs={1}
          >
            <OptimizedImage
              src={img}
              width={32}
              height={32}
              borderRadius={'4px'}
            />
          </Grid>
        ))}
      </Grid>
      <Grid
        item
        container
        direction="column"
        sx={{ width: '67%' }}
        justifyContent="center"
      >
        <Grid item container alignItems="center">
          <Typography variant="h6" mr={1}>
            {country.countryName}
          </Typography>
          <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 16 }} />
        </Grid>
        <Grid item>
          <Typography
            sx={{ opacity: 0.6 }}
          >{`${country.tokens} tokens`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GroupListCard;
