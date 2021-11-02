import React, { useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TollIcon from '@mui/icons-material/Toll';
import { Line } from 'react-chartjs-2';
import graphData from '../data/TokenGraphFakeData';

const style = () => ({
  root: {
    padding: '16px',
  },
  Title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 700,
  },
  Icon: {
    color: '#22222266',
    fontSize: '24px',
    marginRight: '8px',
  },
  NumberContainer: {
    marginLeft: 35,
    display: 'flex',
    alignItems: 'center',
  },
  TokenTotal: {
    fontSize: '16px',
    fontWeight: 700,
  },
  tokenChange: {
    fontSize: '12px',
    fontWeight: 400,
    marginLeft: '8px',
  },
  tokenChangeLastWeek: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#22222266',
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
    <Grid container direction="column" className={classes.root}>
      <div>
        <Typography variant="h6" className={classes.Title}>
          <TollIcon className={classes.Icon} />
          Tokens
        </Typography>
      </div>
      <div className={classes.NumberContainer}>
        <Typography variant="h6" className={classes.TokenTotal}>
          {graphData.tokenTotal}
        </Typography>
        <span className={classes.tokenChange}>
          {graphData.tokenChangeLastWeek}
        </span>
        <span className={classes.tokenChangeLastWeek}>(last week)</span>
      </div>
      <div className={classes.NumberContainer}>
        <Line data={data} options={options} />
      </div>
    </Grid>
  );
}

export default withStyles(style)(TokenGraph);
