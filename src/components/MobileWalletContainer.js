import React from "react";
import { Container, Slide } from "@material-ui/core";
import styled from "styled-components";

const WalletView = styled(Container)`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  width: 100vw;
  min-height: 65vh;
  position: absolute;
  margin: 0;
  bottom: 0%;
  z-index: 1;
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`;

const UserText = styled.h1`
  margin-top: 2rem;
  margin-left: 2rem;
  font-size: 2rem;
  font-family: "Lato", sans-serif;
`;

const MobileWalletContainer = (props) => {
  const { showWallet } = props;

  return (
    <Slide
      in={showWallet}
      direction="up"
      timeout={{
        enter: 800,
        exit: 500,
      }}
    >
      <WalletView>
        <UserText>@UserName</UserText>
      </WalletView>
    </Slide>
  );
};

export default MobileWalletContainer;
