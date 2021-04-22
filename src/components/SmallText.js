import React from 'react';
import {Typography} from '@material-ui/core';

export default function SmallText(props) {
    return (
        <div>
            <Typography style={{fontWeight: 400, fontSize: '12px', lineHeight: '16px'}}>{props.text}</Typography>
        </div>
    )
};