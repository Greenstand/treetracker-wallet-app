import React from "react";
import { Container, Slide } from "@material-ui/core";
import styled from "styled-components";

import WalletTabs from './WalletTabs';
import TreeToken from './TreeToken';

const WalletView = styled(Container)`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  width: 35vw;
  height: 100%;
  max-width: 50vw;
  position: absolute;
  margin: 0;
  left: 0%;
  z-index: 1;
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
  flex-direction: column;
  overflow: auto;
`;

const UserText = styled.h1`
  line-height: 2rem;
  font-weight: 1.5rem;
  font-style: normal;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  margin: 0;
`;

const ViewHeaderText = styled.h1`
  line-height: 1rem;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: normal;
  font-family: "Lato", sans-serif;
  color: rgba(34, 34, 34, 0.6);
  margin: 0;
`;

const TokenText = styled.h1`
  line-height: 1.5rem;
  font-size: 1rem;
  font-style: normal;
  font-weight: normal;
  font-family: "Lato", sans-serif;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
`

const TokensPanel = () => {
  return (
    <div>
      <TreeToken />
      <TreeToken />
      <TreeToken />
    </div>
  )
}

const ImpactPanel = () => {
  return (
    <h1>PAGE_2</h1>
  )
}

const DesktopWalletContainer = (props) => {
  const { showWallet } = props;

  return (
    <Slide
      in={showWallet}
      direction="right"
      timeout={{
        enter: 800,
        exit: 500,
      }}
    >
      <WalletView>
        <div style={{ marginTop: "1rem", display: 'flex', flexDirection: 'column'}}>
          <ViewHeaderText>Wallet</ViewHeaderText>
          <UserText>@UserName</UserText>
          <TokenText>123 tokens</TokenText>
        </div>
        <div style={{height: 'auto', display: 'flex', alignItems: 'center' }}>
        <WalletTabs
          firstTab="Tokens"
          secondTab="Impact"
          firstPanel={<TokensPanel/>}
          secondPanel={<ImpactPanel/>}
        /></div>
      </WalletView>
    </Slide>
  );
};

export default DesktopWalletContainer;
