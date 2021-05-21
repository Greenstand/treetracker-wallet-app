import React from 'react';
import { Avatar } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from "@material-ui/core/styles";
import styled, { css } from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '1rem',
    marginTop: '1rem',
    flexDirection: 'row'
  },
  image: {
    width: 104,
    height: 104,
    marginRight: '1rem'
  },
  image2: {
    width: 32,
    height: 32
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: '8px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  img2: {
    width: "2.0rem",
    height: "2.0rem",
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
}))

const fontStyles = css`
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-size: 1rem;
  line-height: 1.05rem;
  margin: 0;
`

const TokenTitle = styled.p`
  font-weight: 700;
  ${fontStyles}
`

const DateText = styled.p`
  font-weight: 500;
  ${fontStyles}
`

const PlanterText = styled.p`
  font-weight: 500;
  color: rgba(0,0,0,0.6);
  ${fontStyles};
  margin-left: 0.25rem;
`

export default function TreeToken () {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <img
          className={classes.img}
          alt="complex"
          src='https://picsum.photos/id/237/200/300' 
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '0.5rem'}}>
          <TokenTitle>Marula</TokenTitle>
          <ArrowForwardIosIcon style={{fill: '#86C323', width: 16, height: 16}}/>
        </div>
        <DateText>Claimed on January 29, 2021</DateText>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Avatar className={classes.img2} alt="Abayomi" src="https://picsum.photos/id/237" />
          <PlanterText>By Abayomi</PlanterText>
        </div>
      </div>
    </div>
  )
}
