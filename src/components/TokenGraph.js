import React from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TollIcon from '@mui/icons-material/Toll';
import { Line } from 'react-chartjs-2';
import graphData from '../data/TokenGraphFakeData';

const style = () => ({
  Title: {
    display: 'flex',
    alignItems: 'center',
  },
});

function TokenGraph({ classes }) {
  const DataLabel = graphData.points.map((point) => point.date);
  const DataValue = graphData.points.map((point) => point.value);

  // chart data and config
  const data = (canvas) => {
    const ctx = canvas.getContext('2d');
    const LinearGradient = ctx.createLinearGradient(0, 50, 0, 170);
    LinearGradient.addColorStop(0, '#86C232');
    LinearGradient.addColorStop(0.5, 'rgba(134, 194, 50, 0.2)');
    LinearGradient.addColorStop(1, 'rgba(134, 194, 50, 0.2)');

    return {
      labels: DataLabel,
      datasets: [
        {
          data: DataValue,
          backgroundColor: '#86C232',
          borderColor: LinearGradient,
          pointRadius: 0,
          borderWidth: 4,
        },
      ],
    };
  };

  // chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: { display: false },
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: { display: false },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    tension: 0.5,
  };

  return (
    <Grid container direction="column" p={2}>
      <Grid item>
        <Typography variant="h6" className={classes.Title}>
          <TollIcon sx={{ fontSize: 24, opacity: 0.4, mr: 1 }} />
          Tokens
        </Typography>
      </Grid>
      <Grid container item ml={4}>
        <Grid container item alignItems="flex-end">
          <Typography variant="h6" sx={{ lineHeight: 1 }} mr={1}>
            {graphData.tokenTotal}
          </Typography>
          <Typography variant="caption" sx={{ lineHeight: 1 }}>
            {graphData.tokenChangeLastWeek}
          </Typography>
          <Typography variant="caption" sx={{ lineHeight: 1, opacity: 0.4 }}>
            (last week)
          </Typography>
        </Grid>
        <Grid item>
          <Line data={data} options={options} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(style)(TokenGraph);
