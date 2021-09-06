import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

function LinearProgressBar({ value, width, height, ...restProps }) {
  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: `${height}`,
      borderRadius: 30,
      width: `${width}`,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 30,
      backgroundColor: '#67AC5B',
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
