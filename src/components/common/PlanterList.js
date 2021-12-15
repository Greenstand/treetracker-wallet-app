import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import { getOptimizedCDNUrl } from '../utils';

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.25),
    color: theme.palette.grey[400],
  },
}));

function PlanterList(props) {
  const classes = useStyles();

  return (
    <Grid container p={2}>
      <Grid item className={classes.iconContainer}>
        {props.species ? <PublicIcon /> : <GroupsIcon />}
      </Grid>
      <Grid item>
        <Grid>
          <Typography variant="h6">
            {props.species ? 'Environment' : 'Social'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            {props.total} {props.species ? 'tree species' : 'planters involved'}
          </Typography>
        </Grid>
        <AvatarGroup
          max={4}
          spacing={1}
          variant={props.species ? 'rounded' : 'circular'}
          sx={{ justifyContent: 'flex-end' }}
        >
          {props.species
            ? props.species?.map((el) => <Avatar key={el.id} alt={el.name} />)
            : props.planters?.map((el) => (
                <Avatar
                  key={el.id}
                  alt={`${el.first_name} ${el.last_name}`}
                  src={getOptimizedCDNUrl(el.photo_url, 128)}
                />
              ))}
        </AvatarGroup>
      </Grid>
    </Grid>
  );
}

export default PlanterList;
