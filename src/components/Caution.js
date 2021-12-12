import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';
import { withStyles } from '@mui/styles';
import theme from './common/theme';

const styles = {
  root: {
    position: 'relative',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
    maxWidth: '340px',
    margin: 'auto',
    marginTop: theme.spacing(2),
    fontSize: '16px',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.primary.main,
  },
};

const Caution = (props) => {
  const { classes, setIsOpen } = props;

  return (
    <Paper
      elevation={0}
      sx={{ backgroundColor: theme.palette.grey[100] }}
      className={classes.root}
    >
      <div>
        <ClearIcon
          className={classes.closeBtn}
          onClick={() => setIsOpen(false)}
        />
      </div>
      <Typography variant="subtitle2" gutterBottom component="h6">
        Calculation
      </Typography>
      <Typography variant="body1">
        The value of your impact token depends on the criteria it meets.
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <Typography>Social</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckIcon sx={{ color: 'primary.main' }} />
          </ListItemIcon>
          <Typography>Environmental</Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ClearIcon sx={{ color: 'error.light' }} />
          </ListItemIcon>
          <Typography variant="body2" color="textSecondary">
            Economical
          </Typography>
        </ListItem>
      </List>
      <Typography gutterBottom>
        As well as the matrix version: <strong>2020.</strong>
      </Typography>
      <Link href="#" variant="subtitle2" sx={{ fontSize: 14 }}>
        Learn More
      </Link>
    </Paper>
  );
};

export default withStyles(styles)(Caution);
