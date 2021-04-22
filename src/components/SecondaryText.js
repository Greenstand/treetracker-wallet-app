import React from 'react';
import {Typography} from '@material-ui/core';

export default function SecondaryText(props) {
    return (
        <div>
            <Typography style={{fontWeight: 700, fontSize:'24px', lineHeight:'32px'}}>{props.text}</Typography>
        </div>
    )
};