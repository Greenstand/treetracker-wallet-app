import React from 'react';
import {Chip, Typography} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
Chip: {
    color: '#86C232',
    background: 'white',
    width: '324px',
    height: '48px',
    borderWidth: '1px',
    borderColor: '#86C232 !important',
    borderRadius: '4px'
  },
  Typography: {
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '24px',
  },
}));

export default function TokenChip(props) {
    const classes = useStyles();
    return (
        <div>
            <Chip
                className={classes.Chip}
                variant="outlined"
                clickable
                label={
                    <Typography className={classes.Typography}>{props.status}</Typography>
                }
            />
        </div>
    )
}; 
