import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import theme from './theme';

const StyledTab = withStyles({
  root: {
    backgroundColor: theme.palette.secondary.lightGreen,
    color: theme.palette.primary.main,
    opacity: 1,
    borderRadius: theme.shape.borderRadius,
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
})(Tab);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
    width: '90%',
    margin: 'auto',
    marginBottom: theme.spacing(1),
  },
}));

function CustomizedTabs({ tab1, tab2, tab1Veiw, tab2Veiw }) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ width: '100%' }}>{children}</Box>}
      </div>
    );
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.root}
        variant="fullWidth"
        textColor="inherit"
        TabIndicatorProps={{ style: { display: 'none' } }}
      >
        <StyledTab label={tab1} />
        <StyledTab label={tab2} />
      </Tabs>
      <Box>
        <TabPanel value={value} index={0}>
          {tab1Veiw}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {tab2Veiw}
        </TabPanel>
      </Box>
    </>
  );
}

export default CustomizedTabs;
