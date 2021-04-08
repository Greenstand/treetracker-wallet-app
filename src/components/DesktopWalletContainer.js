import React from "react";
import { Container, Slide } from "@material-ui/core";
import styled from "styled-components";

const WalletView = styled(Container)`
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  width: 35vw;
  max-width: 50vw;
  height: 100%;
  position: absolute;
  margin: 0;
  left: 0%;
  z-index: 1;
  border-color: rgba(0, 0, 0, 1);
  border-style: solid;
  border-width: 1px;
`;

const UserText = styled.h1`
  margin-top: 2rem;
  margin-left: 2rem;
  font-size: 2rem;
  font-family: "Lato", sans-serif;
`;

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
        <UserText>@UserName</UserText>
      </WalletView>
    </Slide>
  );
};

export default DesktopWalletContainer;
