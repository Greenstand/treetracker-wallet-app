import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '4px',
    margin: '1rem auto',
  },
}));

function CustomButton({ label, handleClick, variant, color, fullWidth }) {
  const classes = useStyles();

  return (
    <Button
      variant={variant}
      color={color}
      className={classes.root}
      onClick={handleClick}
      fullWidth={fullWidth}
    >
      {label}
    </Button>
  );
}

export default CustomButton;
