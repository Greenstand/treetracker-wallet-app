import React from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(6),
    width: theme.spacing(6),
    borderRadius: '50%',
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(1),
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
      <NavigateBeforeIcon sx={{ fontSize: 32 }} color="primary" />
    </button>
  );
};

export default BackButton;
