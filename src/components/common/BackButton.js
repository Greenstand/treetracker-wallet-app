import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '48px',
    width: '48px',
    borderRadius: '32px',
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
  },
}));

const BackButton = () => {
  let history = useHistory();
  const classes = useStyles();
  return (
    <button
      className={classes.root}
      type="button"
      onClick={() => history.goBack()}
    >
      <NavigateBeforeIcon style={{ fontSize: 32 }} color="primary" />
    </button>
  );
};

export default BackButton;
