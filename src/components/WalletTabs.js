import React, { useState } from 'react';
import { Tabs, Tab, Toolbar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';

const useStyles = makeStyles(() => ({
    tab: {
      color: "#000000",
      backgroundColor: '#ffffff',
      width: '144px',
      height: '16px',
      fontSize: '14px',
      lineHeight: '16px',
      fontWeight: 700,
      fontStyle: 'normal',
      "&.Mui-selected": {
        background: "#ffffff",
        color: "#86C232"
      }
    }
}));

export default function WalletTabs(props) {
    const classes = useStyles();
    const tabClasses = { root: classes.tab };
    const [value,setValue] = useState("0")
    const handleTabs=(e,val)=>{
        console.warn(val)
        setValue(val)
    }
    return (
      <div className="GreenTabs">
        <TabContext value={value}>
          <Tabs 
            value={value} 
            onChange={handleTabs} 
            centered
            style={{alignSelf: 'center'}}
            TabIndicatorProps={{ style: { background: "#86C232" } }}
          >
            <Tab label={props.firstTab} classes={tabClasses} value="0"/>
            <Tab label={props.secondTab} classes={tabClasses} value="1"/>
          </Tabs>
          <TabPanel value="0">
            {props.firstPanel}
          </TabPanel>
          <TabPanel value="1">
            {props.secondPanel}
          </TabPanel>
        </TabContext>
      </div>
    );
}
