import React from 'react';
import withStyles from '@mui/styles/withStyles';
import LinearProgress from '@mui/material/LinearProgress';

function LinearProgressBar({ value, width, height, ...restProps }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: `${height}`,
      borderRadius: 30,
      width: `${width}`,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 30,
      backgroundColor: theme.palette.primary.main,
    },
  }))(LinearProgress);

  return (
    <>
      <BorderLinearProgress
        variant="determinate"
        value={value}
        {...restProps}
      />
    </>
  );
}

export default LinearProgressBar;
