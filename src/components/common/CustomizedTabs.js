import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const StyledTab = withStyles({
  root: {
    backgroundColor: '#f7fbf7',
    color: '#67AC5B',
    opacity: 1,
    borderRadius: '8px',
  },
  selected: {
    backgroundColor: '#67AC5B',
    color: '#fff',
  },
})(Tab);

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f7fbf7',
    borderRadius: '8px',
    width: '90%',
    margin: 'auto',
  },
  Box: {
    width: '100%',
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
        {value === index && <Box className={classes.Box}>{children}</Box>}
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
