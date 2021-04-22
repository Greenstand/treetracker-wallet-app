import React from 'react';
import {Tabs,Tab, Toolbar} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

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
    },
    toolBar: {
      margin: '2em 30em',
      maxWidth: 800,
      width: "100%"
    },
}));

export default function WalletTabs(props) {
    const classes = useStyles();
    const tabClasses = { root: classes.tab };
    const [value,setValue]=React.useState(0)
    const handleTabs=(e,val)=>{
        console.warn(val)
        setValue(val)
    }
    return (
            <div className="GreenTabs">
                <Toolbar className={classes.toolBar}>
                    <Tabs 
                        value={value} 
                        onChange={handleTabs} 
                        TabIndicatorProps={{ style: { background: "#86C232" } }}>
                        <Tab label={props.firstTab} classes={tabClasses}/>
                        <Tab label={props.secondTab} classes={tabClasses}/>
                    </Tabs>
                </Toolbar>
            </div>
    );
}