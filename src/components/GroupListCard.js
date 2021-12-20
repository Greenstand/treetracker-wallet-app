import React from 'react';
import { withStyles } from '@mui/styles';
import Box from '@mui/material/Box';
// import ArrowForwardIosIcon from '@mui/icons-material';
import { Typography } from '@mui/material';

const style = () => ({
  row: {
    display: 'flex',
  },
  imgContainer: {
    width: '50%',
  },
  container: {
    alignItems: 'center',
  },
  cell: {
    position: 'relative',
    marginTop: '3%',
    marginRight: '3%',
    flexBasis: '30%',
    '&:after': {
      content: "''",
      display: 'block',
      paddingBottom: '100%',
    },
  },
  content: {
    left: '0',
    position: 'absolute',
    top: '0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '7%',
  },
  tokenContainer: {
    marginLeft: '4%',
  },
  countryContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  country: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '7px',
    '@media (min-width: 300px)': {
      fontSize: '18px',
    },
    '@media (min-width: 400px)': {
      fontSize: '22px',
    },
  },
  arrow: {
    color: '#86C232',
    fontSize: 'small',
    '@media (min-width: 300px)': {
      fontSize: 'medium',
    },
  },
  token: {
    fontSize: '12px',
    color: '#797979',
    '@media (min-width: 300px)': {
      fontSize: '16px',
    },
    '@media (min-width: 400px)': {
      fontSize: '20px',
    },
  },
});

function GroupListCard(props) {
  const { classes, country } = props;
  const imgUrl = country.imgList[0];

  return (
    <Box className={`${classes.row} ${classes.container}`}>
      <Box className={classes.imgContainer}>
        <Box className={classes.row}>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
        </Box>
        <Box className={classes.row}>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
          <Box className={classes.cell}>
            <img
              className={`${classes.content} ${classes.image} `}
              src={imgUrl}
              alt=""
            />
          </Box>
        </Box>
      </Box>
      <Box className={classes.tokenContainer}>
        <Box className={`${classes.row} ${classes.countryContainer}`}>
          <Typography variant="h3" className={classes.country}>
            {country.countryName}
          </Typography>
          {/* <ArrowForwardIosIcon className={classes.arrow} /> */}
        </Box>
        <Typography variant="span" className={classes.token}>
          {`${country.tokens} tokens`}
        </Typography>
      </Box>
    </Box>
  );
}

export default withStyles(style)(GroupListCard);
