import React, { useState, useEffect } from 'react';
import { withStyles, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TokenCard from './TokenCard';

const tokensPerPage = 5;
let arrayForHoldingTokens = [];

const style = (theme) => ({
  TokensContainer: {
    marginTop: '10px',
  },
  ButtonContainer: {
    width: '90%',
    margin: 'auto',
    marginBottom: '16px',
    marginTop: '16px',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
});

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: '4px',
  boxSizing: 'border-box',
  fontSize: '14px',
  fontWeight: '700',
  padding: '10px',
}));

const TokensList = ({ classes, tokens }) => {
  //  const [tokensToShow, setTokensToShow] = useState([]);
  //  const [next, setNext] = useState(5);
  //  const isLastToken = tokens.length;
  //
  //  const loopWithSlice = (start, end) => {
  //    const slicedTokens = tokens.slice(start, end);
  //    arrayForHoldingTokens = [...arrayForHoldingTokens, ...slicedTokens];
  //    setTokensToShow(arrayForHoldingTokens);
  //  };
  //
  //  useEffect(() => {
  //    loopWithSlice(0, tokensPerPage);
  //  }, []);
  //
  //  const handleShowMoreTokens = () => {
  //    loopWithSlice(next, next + tokensPerPage);
  //    setNext(next + tokensPerPage);
  //  };

  //  console.log('tokensPerPage', tokensToShow);
  //  console.log('last token', isLastToken);

  return (
    <div className={classes.TokensContainer}>
      {tokens.map((token, index) => (
        <TokenCard
          key={index}
          TreeImg={token.capture_photo_url}
          ProgressValue={token.ProgressValue}
          TreeName={token.capture_id}
          ClaimedDate={token.ClaimedDate}
          OwnerName={token.planter_name}
          OwnerAvatar={token.planter_photo_url}
        />
      ))}
      {/*
      <div className={classes.ButtonContainer}>
        {tokensToShow.length !== isLastToken ? (
          <CustomButton
            onClick={handleShowMoreTokens}
            fullWidth
            variant="outlined"
            color="primary"
          >
            See more tokens
          </CustomButton>
        ) : (
          'You have see it all'
        )}
      </div>
      */}
    </div>
  );
};

export default withStyles(style)(TokensList);
