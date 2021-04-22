import React from 'react';
import {Typography} from '@material-ui/core';

export default function PrimaryText(props) {
    return (
        <div>
            <Typography style={{fontWeight: 400, fontSize: '16px', lineHeight: '24px'}}>{props.text}</Typography>
        </div>
    )
};