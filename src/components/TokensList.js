import React from 'react';
import withStyles from '@mui/styles/withStyles';
import TokenCard from './TokenCard';

const style = (theme) => ({
  ButtonContainer: {
    width: '90%',
    margin: 'auto',
    marginBottom: '16px',
    marginTop: '16px',
    textAlign: 'center',
    color: theme.palette.primary.main,
  },
});

const TokensList = ({ classes, tokens }) => {
  //  const [tokensToShow, setTokensToShow] = React.useState([]);
  //  const [next, setNext] = React.useState(5);
  //  const isLastToken = tokens.length;
  //
  //  const loopWithSlice = (start, end) => {
  //    const slicedTokens = tokens.slice(start, end);
  //    arrayForHoldingTokens = [...arrayForHoldingTokens, ...slicedTokens];
  //    setTokensToShow(arrayForHoldingTokens);
  //  };
  //
  //  React.useEffect(() => {
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
        <TokenCard key={index} token={token} />
      ))}
      {/*
      <div className={classes.ButtonContainer}>
        {tokensToShow.length !== isLastToken ? (
          <CustomButton
            label="See more tokens"
            handleClick={handleShowMoreTokens}
            fullWidth
            variant="outlined"
            color="primary"
          />
        ) : (
          'You have see it all'
        )}
      </div>
      */}
    </div>
  );
};

export default withStyles(style)(TokensList);
