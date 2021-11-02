import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  iconContainer: {
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.25),
    color: theme.palette.grey[400],
  },
}));

//FAKE DATA, JUST FOR SHOW
const listData = [
  {
    id: 'c488301f-1117-48c3-8866-3c38f28d3f25',
    planter_name: 'Issa H',
    planter_photo_url:
      'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg',
  },
  {
    id: '951554de-145c-11ec-82a8-0242ac130003',
    planter_name: 'Issa H',
    planter_photo_url:
      'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg',
  },
  {
    id: 'c488301f-1117-48c3-8866-3c38f28d3f252',
    planter_name: 'Issa H',
    planter_photo_url:
      'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg',
  },
  {
    id: '951554de-145c-11ec-82a8-0242ac1300031',
    planter_name: 'Issa H',
    planter_photo_url:
      'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg',
  },
  {
    id: '951554de-145c-11ec-82a8-0242ac1300033',
    planter_name: 'Issa H',
    planter_photo_url:
      'https://treetracker-production-images.s3.eu-central-1.amazonaws.com/2021.05.11.18.37.00_-4.91963284_38.52757506_adc35f9c-b76e-4798-b587-70f5fba06b89_IMG_20210511_101502_-1595081185.jpg',
  },
];

function PlanterList({ isSocial }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.iconContainer}>
        {isSocial ? <GroupsIcon /> : <PublicIcon />}
      </Grid>
      <Grid>
        <Grid>
          <Typography variant="h6">
            {isSocial ? 'Social' : 'Environment'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{listData.length} planters involved</Typography>
        </Grid>
        <AvatarGroup
          max={4}
          spacing={1}
          variant={isSocial ? 'circular' : 'rounded'}
        >
          {listData.map((el) => (
            <Avatar
              key={el.id}
              alt={el.planter_name}
              src={el.planter_photo_url}
            />
          ))}
        </AvatarGroup>
      </Grid>
    </Grid>
  );
}

export default PlanterList;
